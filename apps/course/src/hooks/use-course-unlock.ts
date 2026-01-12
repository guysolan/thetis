import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "thetis-course-unlocks";

interface CourseUnlocks {
    standard: boolean;
    premium: boolean;
}

function getStoredUnlocks(): CourseUnlocks {
    if (typeof window === "undefined") {
        return { standard: true, premium: false };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Failed to load course unlocks:", error);
    }

    // Default: standard unlocked, premium locked
    return { standard: true, premium: false };
}

function saveUnlocks(unlocks: CourseUnlocks): void {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocks));
    } catch (error) {
        console.error("Failed to save course unlocks:", error);
    }
}

export function useCourseUnlock() {
    const [unlocks, setUnlocks] = useState<CourseUnlocks>(getStoredUnlocks);

    // Load unlocks on mount and initialize default if not set
    useEffect(() => {
        const stored = getStoredUnlocks();
        setUnlocks(stored);

        // If no stored value exists, save the default (standard unlocked, premium locked)
        if (typeof window !== "undefined") {
            const hasStored = localStorage.getItem(STORAGE_KEY);
            if (!hasStored) {
                const defaults = { standard: true, premium: false };
                saveUnlocks(defaults);
            }
        }
    }, []);

    const isUnlocked = useCallback(
        (courseType: "standard" | "premium"): boolean => {
            return unlocks[courseType];
        },
        [unlocks],
    );

    const unlockCourse = useCallback((courseType: "standard" | "premium") => {
        setUnlocks((prev) => {
            const updated = {
                ...prev,
                [courseType]: true,
            };
            saveUnlocks(updated);
            return updated;
        });
    }, []);

    const lockCourse = useCallback((courseType: "standard" | "premium") => {
        setUnlocks((prev) => {
            const updated = {
                ...prev,
                [courseType]: false,
            };
            saveUnlocks(updated);
            return updated;
        });
    }, []);

    return {
        isUnlocked,
        unlockCourse,
        lockCourse,
    };
}
