"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@thetis/ui/input";
import { Search } from "lucide-react";

export function ArticleSearch() {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Dispatch custom event for the script to listen to
        const event = new CustomEvent("articleSearchChange", {
            detail: { query: searchQuery },
        });
        window.dispatchEvent(event);
    }, [searchQuery]);

    return (
        <div className="mb-8 w-full">
            <div className="mb-4 font-semibold text-gray-800 text-lg">
                🔍 Search Articles
            </div>
            <div className="relative">
                <Search className="top-1/2 left-4 absolute w-6 h-6 text-gray-400 -translate-y-1/2" />
                <Input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white shadow-sm pl-12 border-2 border-gray-300 focus:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 w-full h-14 text-gray-900 text-lg"
                />
            </div>
        </div>
    );
}
