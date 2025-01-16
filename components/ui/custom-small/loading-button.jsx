import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { ButtonProps } from "@/components/ui/button"

export function LoadingButton({ 
    isLoading, 
    children, 
    ...props 
}) {
    return (
        <Button {...props} disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : children}
        </Button>
    )
}

