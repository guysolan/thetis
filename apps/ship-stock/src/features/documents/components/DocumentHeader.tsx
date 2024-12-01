import React from "react";

const DocumentHeader = () => {
  return (
    <header className="flex items-center gap-2 border-neutral-400 mb-4 pb-4 border-b">
      <svg
        width="32"
        height="32"
        viewBox="0 0 531.1 488.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <circle cx="265.6" cy="449.9" r="31.2" />
        <circle cx="265.6" cy="367" r="39" />
        <circle cx="265.6" cy="268.5" r="46.8" />
        <circle cx="265.6" cy="61.6" r="54.6" />
        <path d="M279.9,156.7c1.8-24.9,22.3-38.6,46.9-44.3c37.5-8.7,186.1,3.5,193.5,40.1c7.9,39.2-114.5,128.3-187.9,89.4c-23.3-12.4-55-44.7-52.5-84.6C279.9,157.1,279.9,156.9,279.9,156.7z" />
        <path d="M251.2,156.7c-1.8-24.9-22.3-38.6-46.9-44.3c-37.5-8.7-186.1,3.5-193.5,40.1c-7.9,39.2,114.5,128.3,187.9,89.4c23.3-12.4,55-44.7,52.5-84.6C251.2,157.1,251.2,156.9,251.2,156.7z" />
      </svg>
      <span className="!m-0 my-auto !p-0 font-bold text-xl">
        Thetis Medical
      </span>
    </header>
  );
};

export default DocumentHeader;
