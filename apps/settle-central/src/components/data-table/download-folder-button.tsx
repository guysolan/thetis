import { Button } from "@thetis/ui/button";
import { useDownloadFiles } from "../../api/useDownloadFiles";
import { FolderDown } from "lucide-react";
const AmazonSettlementCard = ({
  disabled,
  storagePath,
}: { disabled: boolean; storagePath: string }) => {
  const { mutate: downloadFile } = useDownloadFiles();

  return (
    <Button
      disabled={disabled}
      variant="outline"
      size="icon"
      onClick={() => downloadFile({ path: storagePath })}
    >
      <FolderDown className="w-4 h-4" />
      <span className="sr-only">Download</span>
    </Button>
  );
};

export default AmazonSettlementCard;
