import { ButtonProps, Button } from "../components/ui/button";
import { openAmazon } from "@/services/openAmazon.ts";

export const AmazonButton = ({ ...props }: ButtonProps) => {
  return (
    <Button {...props} onClick={openAmazon}>
      Shop
    </Button>
  );
};
