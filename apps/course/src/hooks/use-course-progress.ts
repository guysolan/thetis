import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSimpleAuth } from "./use-simple-auth";

interface UserProgress {
    section_slug: string;
    completed_at: string | null;
    last_accessed_at: string;
}

export function useCourseProgress() {
    const { email } = useSimpleAuth();
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [currentBookmark, setCurrentBookmarkState] = useState<string | null>(
        null,
    );
    const [loading, setLoading] = useState(true);

    // Load progress from database on mount and when email changes
    useEffect(() => {
        if (!email) {
            setCompletedLessons([]);
            setCurrentBookmarkState(null);
            setLoading(false);
            return;
        }

        const loadProgress = async () => {
            try {
                const { data, error } = await supabase
                    .from("user_progress")
                    .select("section_slug, completed_at, last_accessed_at")
                    .eq("user_email", email.toLowerCase())
                    .order("last_accessed_at", { ascending: false });

                if (error) {
                    console.error("Error loading progress:", error);
                    setCompletedLessons([]);
                    setCurrentBookmarkState(null);
                } else {
                    const completed = (data || [])
                        .filter((p) => p.completed_at !== null)
                        .map((p) => p.section_slug);
                    setCompletedLessons(completed);

                    // Set bookmark to most recently accessed section
                    if (data && data.length > 0) {
                        setCurrentBookmarkState(data[0].section_slug);
                    }
                }
            } catch (error) {
                console.error("Failed to load progress:", error);
                setCompletedLessons([]);
                setCurrentBookmarkState(null);
            } finally {
                setLoading(false);
            }
        };

        loadProgress();
    }, [email]);

    const markLessonComplete = useCallback(
        async (lessonSlug: string) => {
            if (!email) return;

            // Optimistically update UI
            if (!completedLessons.includes(lessonSlug)) {
                setCompletedLessons((prev) => [...prev, lessonSlug]);
            }
            setCurrentBookmarkState(lessonSlug);

            // Save to database
            try {
                const { error } = await supabase
                    .from("user_progress")
                    .upsert(
                        {
                            user_email: email.toLowerCase(),
                            section_slug: lessonSlug,
                            completed_at: new Date().toISOString(),
                            last_accessed_at: new Date().toISOString(),
                        },
                        {
                            onConflict: "user_email,section_slug",
                        },
                    );

                if (error) {
                    console.error("Error saving progress:", error);
                    // Revert optimistic update
                    setCompletedLessons((prev) =>
                        prev.filter((slug) => slug !== lessonSlug)
                    );
                }
            } catch (error) {
                console.error("Failed to save progress:", error);
                // Revert optimistic update
                setCompletedLessons((prev) =>
                    prev.filter((slug) => slug !== lessonSlug)
                );
            }
        },
        [email, completedLessons],
    );

    const markLessonIncomplete = useCallback(
        async (lessonSlug: string) => {
            if (!email) return;

            // Optimistically update UI
            setCompletedLessons((prev) =>
                prev.filter((slug) => slug !== lessonSlug)
            );

            // Update database (set completed_at to null)
            try {
                const { error } = await supabase
                    .from("user_progress")
                    .upsert(
                        {
                            user_email: email.toLowerCase(),
                            section_slug: lessonSlug,
                            completed_at: null,
                            last_accessed_at: new Date().toISOString(),
                        },
                        {
                            onConflict: "user_email,section_slug",
                        },
                    );

                if (error) {
                    console.error("Error updating progress:", error);
                    // Revert optimistic update
                    setCompletedLessons((prev) => [...prev, lessonSlug]);
                }
            } catch (error) {
                console.error("Failed to update progress:", error);
                // Revert optimistic update
                setCompletedLessons((prev) => [...prev, lessonSlug]);
            }
        },
        [email],
    );

    const isLessonComplete = useCallback(
        (lessonSlug: string): boolean => {
            return completedLessons.includes(lessonSlug);
        },
        [completedLessons],
    );

    const getCompletionPercentage = useCallback(
        (totalLessons: number): number => {
            if (totalLessons === 0) return 0;
            const percentage = Math.round(
                (completedLessons.length / totalLessons) * 100,
            );
            return Math.min(percentage, 100);
        },
        [completedLessons.length],
    );

    const clearProgress = useCallback(async () => {
        if (!email) return;

        setCompletedLessons([]);
        setCurrentBookmarkState(null);

        // Clear from database
        try {
            const { error } = await supabase
                .from("user_progress")
                .delete()
                .eq("user_email", email.toLowerCase());

            if (error) {
                console.error("Error clearing progress:", error);
            }
        } catch (error) {
            console.error("Failed to clear progress:", error);
        }
    }, [email]);

    const getCurrentBookmark = useCallback((): string | null => {
        return currentBookmark;
    }, [currentBookmark]);

    const setCurrentBookmark = useCallback(
        async (lessonSlug: string) => {
            if (!email) return;

            // Update state
            setCurrentBookmarkState(lessonSlug);

            // Update last_accessed_at in database
            try {
                await supabase.from("user_progress").upsert(
                    {
                        user_email: email.toLowerCase(),
                        section_slug: lessonSlug,
                        last_accessed_at: new Date().toISOString(),
                    },
                    {
                        onConflict: "user_email,section_slug",
                    },
                );
            } catch (error) {
                console.error("Failed to update bookmark:", error);
            }
        },
        [email],
    );

    return {
        completedLessons,
        currentBookmark,
        markLessonComplete,
        markLessonIncomplete,
        isLessonComplete,
        getCompletionPercentage,
        clearProgress,
        getCurrentBookmark,
        setCurrentBookmark,
        loading,
    };
}
