import React from "react";
import { Font, Head as ReactEmailHead } from "@react-email/components";

const Head = () => {
  return (
    <ReactEmailHead>
      <Font
        fontFamily="Raleway"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/raleway/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </ReactEmailHead>
  );
};

export default Head;
