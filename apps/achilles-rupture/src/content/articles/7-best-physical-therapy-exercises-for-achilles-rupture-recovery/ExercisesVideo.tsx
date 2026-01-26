import React from "react";

const ExercisesVideo = () => {
    return (
        <div className="relative w-full aspect-video">
            <iframe
                src="https://www.youtube.com/embed/uF8d36TDacw"
                title="Achilles Rehab after Surgery - Exercises and Recovery Times"
                className="top-0 left-0 absolute w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default ExercisesVideo;
