"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@thetis/ui/dialog";
import { BookOpen, Check, GraduationCap, Star, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { courseData } from "@/lib/course-data";

interface CourseInfoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courseType: "standard" | "premium";
}

export function CourseInfoDialog({
    open,
    onOpenChange,
    courseType,
}: CourseInfoDialogProps) {
    const course = courseData[courseType];
    const Icon = course.icon;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white dark:bg-neutral-800 max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start gap-3 mb-4">
                        <div
                            className={cn(
                                "flex justify-center items-center rounded-xl w-12 h-12 shrink-0",
                                course.badgeColor,
                            )}
                        >
                            <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <span
                                className={cn(
                                    "inline-block mb-2 px-2 py-0.5 rounded font-semibold text-xs",
                                    course.badgeColor,
                                )}
                            >
                                {course.badge}
                            </span>
                            <DialogTitle className="mb-2 text-2xl md:text-3xl">
                                {course.title}
                            </DialogTitle>
                            <DialogDescription className="text-neutral-600 dark:text-neutral-400 text-base">
                                {course.description}
                            </DialogDescription>
                            <div className="mt-4">
                                <span className="font-bold text-neutral-900 dark:text-neutral-100 text-3xl">
                                    {course.price}
                                </span>
                                <span className="ml-2 text-neutral-500 dark:text-neutral-400">
                                    one-time
                                </span>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                    {/* Features */}
                    <div>
                        <h3 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                            What's Included
                        </h3>
                        <div className="gap-3 grid md:grid-cols-2">
                            {course.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg"
                                >
                                    <div className="flex justify-center items-center bg-primary/10 rounded-full w-6 h-6 shrink-0">
                                        <Check className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What You'll Learn (Standard) or Video Topics (Premium) */}
                    {courseType === "standard" && "whatYoullLearn" in course &&
                        course.whatYoullLearn && (
                        <div>
                            <h3 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                                What You'll Learn
                            </h3>
                            <div className="gap-3 grid md:grid-cols-2">
                                {course.whatYoullLearn.map((
                                    item: {
                                        title: string;
                                        description: string;
                                    },
                                    index: number,
                                ) => (
                                    <div
                                        key={index}
                                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg"
                                    >
                                        <h4 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                            {item.title}
                                        </h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {courseType === "premium" && "videoTopics" in course &&
                        course.videoTopics && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Video className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                                    Expert Video Lessons
                                </h3>
                            </div>
                            <div className="gap-3 grid md:grid-cols-2">
                                {course.videoTopics.map((
                                    topic: {
                                        title: string;
                                        description: string;
                                    },
                                    index: number,
                                ) => (
                                    <div
                                        key={index}
                                        className="bg-neutral-50 dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-8 h-8">
                                                <Video className="w-4 h-4 text-primary" />
                                            </div>
                                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                                                {topic.title}
                                            </h4>
                                        </div>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                                            {topic.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
