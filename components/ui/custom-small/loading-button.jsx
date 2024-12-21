import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton({ isLoading, icon, loadingText, buttonText, classNames, size = "default" }) {
    return <Button type='submit' className={`${classNames} w-full`} size={size} disabled={isLoading}>
        {isLoading ? <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            <span className='text-base font-normal mr-2 tracking-tight'>{loadingText}</span>
        </> : <div className='flex items-center'>
            <span className='text-base font-normal mr-2 tracking-tight'>{buttonText}</span>
            <span>{icon}</span>
        </div>}
    </Button>
}