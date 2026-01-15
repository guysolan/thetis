import { useCallback, useEffect, useState } from "react";
import { sections } from "@/content/course/sections";

const STORAGE_KEY = "course-progress";

interface CourseProgress {
    completedLessons: string[];
    currentBookmark: string | null; // The current position/bookmark in the course
}

// Get stored progress from localStorage
function getStoredProgress(): CourseProgress {
    if (typeof window === "undefined") {
        return { completedLessons: [], currentBookmark: null };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Failed to load course progress:", error);
    }

    return { completedLessons: [], currentBookmark: null };
}

// Save progress to localStorage
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
        const stored = getStoredProgress();
        setProgress(stored);
    }, []);

    // Save to localStorage whenever progress changes
    useEffect(() => {
        saveProgress(progress);
    }, [progress]);

    const markLessonComplete = useCallback((lessonSlug: string) => {
        setProgress((prev) => {
            if (prev.completedLessons.includes(lessonSlug)) {
                return prev; // Already completed
            }
            const updated = {
                completedLessons: [...prev.completedLessons, lessonSlug],
                currentBookmark: lessonSlug, // Update bookmark to current lesson
            };
            return updated;
        });
    }, []);

    const markLessonIncomplete = useCallback((lessonSlug: string) => {
        setProgress((prev) => ({
            ...prev,
            completedLessons: prev.completedLessons.filter(
                (slug) => slug !== lessonSlug,
            ),
        }));
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
            const percentage = Math.round(
                (progress.completedLessons.length / totalLessons) * 100,
            );
            return Math.min(percentage, 100);
        },
        [progress.completedLessons.length],
    );

    const clearProgress = useCallback(() => {
        setProgress({ completedLessons: [], currentBookmark: null });
    }, []);

    const getCurrentBookmark = useCallback((): string | null => {
        return progress.currentBookmark;
    }, [progress.currentBookmark]);

    const setCurrentBookmark = useCallback((lessonSlug: string) => {
        setProgress((prev) => ({
            ...prev,
            currentBookmark: lessonSlug,
        }));
    }, []);

    return {
        completedLessons: progress.completedLessons,
        currentBookmark: progress.currentBookmark,
        markLessonComplete,
        markLessonIncomplete,
        isLessonComplete,
        getCompletionPercentage,
        clearProgress,
        getCurrentBookmark,
        setCurrentBookmark,
    };
}
