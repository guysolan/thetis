import React from "react";

const WalkingVideo = () => {
    return (
        <div className="relative w-full aspect-video">
            <iframe
                src="https://www.youtube.com/embed/wmogX5o711E"
                title="Walking techniques with Aircast boot after Achilles rupture"
                className="top-0 left-0 absolute w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default WalkingVideo;
