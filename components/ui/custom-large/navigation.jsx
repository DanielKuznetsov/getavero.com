'use client'

import { SignedIn, useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export function NavigationSignedOut() {
    const { signOut } = useClerk()

    return (
        <header className={`z-10 flex gap-1 sm:gap-0 flex-row items-center justify-between py-4 px-4 sm:px-6 bg-[#fbfcfc] shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-b border-[#e5e7eb]`}>
            <div>
                {/* Placeholder for logo */}
                &nbsp;
            </div>

            <SignedIn>
                <Button onClick={() => signOut()} size="sm" variant="secondary" className='bg-[#f3f4f6] text-[#1f2937] border border-[#e5e7eb] shadow-[0_1px_4px_0_#e5e7eb] rounded-lg hover:border-[#d1d5db] hover:bg-[#f9fafb] hover:shadow-[0_1px_4px_0_#d1d5db] transition-all duration-500 font-normal'>
                    Sign out
                </Button>
            </SignedIn>
        </header>
    )
}