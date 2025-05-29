import { Button } from "@thetis/ui/button";
import * as changeCase from "change-case";
import DocumentOptionsPopover from "./DocumentOptionsPopover";
import { documentOptions } from "../schema";
import dayjs from "dayjs";

const DocumentControls = ({
  documentType,
  orderNumber,
}: { documentType?: keyof typeof documentOptions; orderNumber?: string }) => {
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = documentType
      ? `${changeCase.snakeCase(documentType)}_${orderNumber}_${dayjs().format("YYYY-MM-DD")}`
      : `document_${dayjs().format("YYYY-MM-DD")}`;

    window.print();

    // Restore the original title
    document.title = originalTitle;
  };

  return (
    <>
      <div className="print:hidden top-4 right-4 z-10 fixed flex items-center gap-2">
        {documentType && documentType !== "shippingLabel" && (
          <DocumentOptionsPopover documentType={documentType} />
        )}
        <Button onClick={handlePrint}>Print</Button>
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
              color: black !important;
            }
            * {
              color: black !important;
              text-color: black !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default DocumentControls;
