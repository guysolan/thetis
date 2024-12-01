import { Button } from "@thetis/ui/button";

import DocumentOptionsPopover from "./DocumentOptionsPopover";
import { documentOptions } from "../schema";

const DocumentControls = ({
  documentType,
}: { documentType?: keyof typeof documentOptions }) => {
  return (
    <>
      <div className="top-4 right-4 fixed flex items-center gap-2 print:hidden">
        {documentType && <DocumentOptionsPopover documentType={documentType} />}
        <Button onClick={() => window.print()}>Print</Button>
      </div>
      <style>
        {`
          @page {
            margin: 4mm 0mm;
            size: auto;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default DocumentControls;
