import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "thetis-course-progress";

interface CourseProgress {
    completedLessons: string[]; // Array of lesson slugs
    lastAccessed?: string; // ISO date string
}

function getStoredProgress(): CourseProgress {
    if (typeof window === "undefined") {
        return { completedLessons: [] };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Failed to load course progress:", error);
    }

    return { completedLessons: [] };
}

function saveProgress(progress: CourseProgress): void {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save course progress:", error);
    }
}

export function useCourseProgress() {
    const [progress, setProgress] = useState<CourseProgress>(getStoredProgress);

    // Load progress on mount
    useEffect(() => {
        setProgress(getStoredProgress());
    }, []);

    const markLessonComplete = useCallback((lessonSlug: string) => {
        setProgress((prev) => {
            if (prev.completedLessons.includes(lessonSlug)) {
                return prev; // Already completed
            }

            const updated = {
                ...prev,
                completedLessons: [...prev.completedLessons, lessonSlug],
                lastAccessed: new Date().toISOString(),
            };

            saveProgress(updated);
            return updated;
        });
    }, []);

    const markLessonIncomplete = useCallback((lessonSlug: string) => {
        setProgress((prev) => {
            const updated = {
                ...prev,
                completedLessons: prev.completedLessons.filter(
                    (slug) => slug !== lessonSlug,
                ),
                lastAccessed: new Date().toISOString(),
            };

            saveProgress(updated);
            return updated;
        });
    }, []);

    const isLessonComplete = useCallback(
        (lessonSlug: string): boolean => {
            return progress.completedLessons.includes(lessonSlug);
        },
        [progress.completedLessons],
    );

    const getCompletionPercentage = useCallback(
        (totalLessons: number): number => {
            if (totalLessons === 0) return 0;
            return Math.round(
                (progress.completedLessons.length / totalLessons) * 100,
            );
        },
        [progress.completedLessons.length],
    );

    const clearProgress = useCallback(() => {
        const cleared = { completedLessons: [] };
        saveProgress(cleared);
        setProgress(cleared);
    }, []);

    return {
        completedLessons: progress.completedLessons,
        markLessonComplete,
        markLessonIncomplete,
        isLessonComplete,
        getCompletionPercentage,
        clearProgress,
    };
}
