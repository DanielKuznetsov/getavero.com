'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function AddExtra({
    options,
    updateOrderItems,
    orderItems
}) {
    const handleExtraToggle = (checked, option) => {
        let updatedExtras = [...(orderItems.extra || [])]

        if (checked) {
            updatedExtras.push(option)
        } else {
            updatedExtras = updatedExtras.filter(e => e.name !== option.name)
        }

        updateOrderItems({
            ...orderItems,
            extra: updatedExtras
        })
    }

    return (
        <div className="space-y-2">
            {options.map((option, index) => (
                <div className="flex items-center justify-between py-2" key={option.name + "-" + index}>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={option.name}
                            checked={orderItems.extra?.some(e => e.name === option.name)}
                            onCheckedChange={(checked) => handleExtraToggle(checked, option)}
                        />
                        <Label htmlFor={option.name} className="text-sm">{option.name}</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        ${option.price.toFixed(2)}
                    </span>
                </div>
            ))}
        </div>
    )
}

