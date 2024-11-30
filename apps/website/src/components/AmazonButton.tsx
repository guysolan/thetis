import { ButtonProps, Button } from '@thetis/ui/button'
import { openAmazon } from '@/services/openAmazon.ts'

export const AmazonButton = ({ ...props }: ButtonProps) => {
    return (
        <Button {...props} onClick={openAmazon}>
            Shop
        </Button>
    )
}
