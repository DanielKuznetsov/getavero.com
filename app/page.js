'use client'

import { useState } from "react"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { LoadingButton } from "@/components/ui/custom-small/loading-button"
import { insertMenuItems } from "@/app/actions/restaurant-actions"
import { toast } from "sonner"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const handleInsertMenuItems = async () => {
    setIsLoading(true)
    try {
      const result = await insertMenuItems()
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to insert menu items")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-4 p-4">
      <SignedIn>
        <LoadingButton 
          onClick={handleInsertMenuItems}
          isLoading={isLoading}
        >
          Insert Menu Items
        </LoadingButton>
      </SignedIn>

      <SignedOut>
        <p>Marketing Page</p>
      </SignedOut>
    </div>
  )
}

