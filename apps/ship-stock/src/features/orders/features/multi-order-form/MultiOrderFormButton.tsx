import { Button } from "@thetis/ui/button";
import { useStockValidation } from "../order-forms/hooks/useStockValidation";

function MultiOrderFormButton() {
  const { hasNegativeStock } = useStockValidation();

  return (
    <Button disabled={hasNegativeStock} type="submit">
      Submit
    </Button>
  );
}
export default MultiOrderFormButton;
