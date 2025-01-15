'use client'

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function ChooseTopping({ 
    toppings, 
    priceName, 
    updateOrderItems, 
    orderItems,
    selectedValue 
}) {
    const handleToppingChange = (toppingName) => {
        const basePrice = 0.50
        
        updateOrderItems({
            ...orderItems,
            toppings: [{
                name: toppingName,
                price: basePrice,
                size: priceName
            }]
        })
    }

    return (
        <RadioGroup 
            onValueChange={handleToppingChange} 
            value={orderItems.toppings[0]?.name || ""}
            className="space-y-2"
        >
            {toppings.map((topping, index) => (
                <div className="flex items-center justify-between py-2" key={topping.name + "-" + index}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value={topping.name} id={topping.name} />
                        <Label htmlFor={topping.name} className="text-sm">{topping.name}</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        ${0.50}
                    </span>
                </div>
            ))}
        </RadioGroup>
    )
}