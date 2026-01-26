import React from "react";

const MostAskedQuestionsVideo = () => {
    return (
        <div className="relative w-full aspect-video">
            <iframe
                src="https://www.youtube.com/embed/Uf4JOFvWtdM"
                title="Achilles Tendon Recovery: Your Most Asked Questions"
                className="top-0 left-0 absolute w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default MostAskedQuestionsVideo;
