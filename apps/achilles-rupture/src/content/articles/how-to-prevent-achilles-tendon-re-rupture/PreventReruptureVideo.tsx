import React from "react";

const PreventReruptureVideo: React.FC = () => {
    return (
        <div className="relative mx-auto mt-8 w-full">
            <iframe
                className="shadow-lg mx-auto rounded-lg w-full max-w-[300px] md:hover:max-w-[60vw] md:max-w-[50vw] lg:hover:max-w-[70vw] hover:max-w-[80vw] aspect-video transition-all duration-300 cursor-pointer"
                title="How Athletes Can Prevent Achilles Ruptures and Injuries"
                src="https://www.youtube.com/embed/DP4S-D7JmmE"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default PreventReruptureVideo;
