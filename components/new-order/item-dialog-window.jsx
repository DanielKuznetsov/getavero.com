'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MinusCircle, PlusCircle } from 'lucide-react'

export default function ItemDialogWindow({ item, isDialogOpen, setIsDialogOpen, addItemToOrder }) {
    const initialOptions = {
        size: item?.choose_option?.options[0]?.name || '',
        topping: '',
        salad: '',
        pasta: '',
        soda: '',
        extraToppings: [],
        extras: [],
        removedToppings: [],
        modifications: [],
        saladMods: [],
        quantity: 1,
        notes: ''
    }

    const [selectedOptions, setSelectedOptions] = useState(initialOptions)

    useEffect(() => {
        if (isDialogOpen) {
            setSelectedOptions(initialOptions)
        }
    }, [isDialogOpen, item])

    const getToppingPrice = () => {
        if (item?.add_toppings?.pricing !== undefined) {
            return item.add_toppings.pricing;
        }

        const selectedSize = selectedOptions.size;
        return item?.add_toppings?.pizza_sizes?.find(
            size => size.name === selectedSize
        )?.price || 0;
    }

    const calculatePriceBreakdown = () => {
        const breakdown = {
            base: 0,
            toppings: 0,
            extras: 0,
            modifications: 0,
            total: 0
        };
        
        // Base price from chosen size
        const chosenOption = item?.choose_option?.options.find(
            opt => opt.name === selectedOptions.size
        );
        breakdown.base = chosenOption?.price || 0;

        // Extra toppings price
        const toppingPrice = getToppingPrice();
        breakdown.toppings = selectedOptions.extraToppings.length * toppingPrice;

        // Add extra items price
        if (item?.add_extra?.options) {
            selectedOptions.extras.forEach(extraName => {
                const extraItem = item.add_extra.options.find(opt => opt.name === extraName);
                if (extraItem?.price) {
                    breakdown.extras += extraItem.price;
                }
            });
        }

        // Add modification prices
        if (item?.general_pizza_mod?.options) {
            selectedOptions.modifications.forEach(modName => {
                const mod = item.general_pizza_mod.options.find(opt => opt.name === modName);
                if (mod?.price) {
                    breakdown.modifications += mod.price;
                }
            });
        }

        breakdown.total = (breakdown.base + breakdown.toppings + breakdown.extras + breakdown.modifications) * selectedOptions.quantity;
        return breakdown;
    }

    const handleAddItem = () => {
        if (item) {
            const priceBreakdown = calculatePriceBreakdown();
            const orderItem = {
                name: item.name,
                size: selectedOptions.size,
                topping: selectedOptions.topping || undefined,
                salad: selectedOptions.salad || undefined,
                pasta: selectedOptions.pasta || undefined,
                soda: selectedOptions.soda || undefined,
                extraToppings: selectedOptions.extraToppings.length > 0 ? selectedOptions.extraToppings : undefined,
                extras: selectedOptions.extras.length > 0 ? selectedOptions.extras : undefined,
                removedToppings: selectedOptions.removedToppings.length > 0 ? selectedOptions.removedToppings : undefined,
                modifications: selectedOptions.modifications.length > 0 ? selectedOptions.modifications : undefined,
                saladMods: selectedOptions.saladMods.length > 0 ? selectedOptions.saladMods : undefined,
                quantity: selectedOptions.quantity,
                notes: selectedOptions.notes || undefined,
                priceBreakdown,
                totalPrice: priceBreakdown.total
            }

            // Remove undefined properties
            Object.keys(orderItem).forEach(key => 
                orderItem[key] === undefined && delete orderItem[key]
            );

            addItemToOrder(orderItem)
            setIsDialogOpen(false)
        }
    }

    const handleQuantityChange = (increment) => {
        setSelectedOptions(prev => ({
            ...prev,
            quantity: Math.max(1, prev.quantity + increment)
        }))
    }

    const priceBreakdown = calculatePriceBreakdown();
    
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{item?.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    {/* Choose Option Section */}
                    {item?.choose_option && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Choose an Option</h3>
                            <RadioGroup
                                value={selectedOptions.size}
                                onValueChange={(value) => 
                                    setSelectedOptions(prev => ({...prev, size: value}))
                                }
                            >
                                {item.choose_option.options.map((option) => (
                                    <div key={option.name} className="flex items-center justify-between space-x-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value={option.name} id={option.name} />
                                            <Label htmlFor={option.name}>{option.name}</Label>
                                        </div>
                                        <span className="text-sm font-medium">
                                            ${option.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {/* Choose Topping Section */}
                    {item?.choose_topping && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Choose Topping</h3>
                            <RadioGroup
                                value={selectedOptions.topping}
                                onValueChange={(value) => 
                                    setSelectedOptions(prev => ({...prev, topping: value}))
                                }
                            >
                                {item.choose_topping.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.name} id={`topping-${option.name}`} />
                                        <Label htmlFor={`topping-${option.name}`}>{option.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {/* Choose Salad Section */}
                    {item?.choose_salad && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Choose Salad</h3>
                            <RadioGroup
                                value={selectedOptions.salad}
                                onValueChange={(value) => 
                                    setSelectedOptions(prev => ({...prev, salad: value}))
                                }
                            >
                                {item.choose_salad.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.name} id={`salad-${option.name}`} />
                                        <Label htmlFor={`salad-${option.name}`}>{option.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {/* Add Extra Toppings Section */}
                    {item?.add_toppings && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">Add Extra Toppings</h3>
                                <span className="text-sm text-muted-foreground">
                                    +${getToppingPrice().toFixed(2)} each
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {item.add_toppings.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`extra-${option.name}`}
                                            checked={selectedOptions.extraToppings.includes(option.name)}
                                            onCheckedChange={(checked) => {
                                                setSelectedOptions(prev => ({
                                                    ...prev,
                                                    extraToppings: checked
                                                        ? [...prev.extraToppings, option.name]
                                                        : prev.extraToppings.filter(t => t !== option.name)
                                                }))
                                            }}
                                        />
                                        <Label htmlFor={`extra-${option.name}`}>{option.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Choose Pasta Section */}
                    {item?.choose_pasta && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Choose Pasta</h3>
                            <RadioGroup
                                value={selectedOptions.pasta}
                                onValueChange={(value) => 
                                    setSelectedOptions(prev => ({...prev, pasta: value}))
                                }
                            >
                                {item.choose_pasta.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.name} id={`pasta-${option.name}`} />
                                        <Label htmlFor={`pasta-${option.name}`}>{option.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {/* Add Extra Section */}
                    {item?.add_extra && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Add Extra</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {item.add_extra.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`extra-${option.name}`}
                                            checked={selectedOptions.extras.includes(option.name)}
                                            onCheckedChange={(checked) => {
                                                setSelectedOptions(prev => ({
                                                    ...prev,
                                                    extras: checked
                                                        ? [...prev.extras, option.name]
                                                        : prev.extras.filter(t => t !== option.name)
                                                }))
                                            }}
                                        />
                                        <Label htmlFor={`extra-${option.name}`}>{option.name}</Label>
                                        {option.price && (
                                            <span className="text-sm text-muted-foreground">
                                                +${option.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Remove Toppings Section */}
                    {item?.remove_toppings && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Remove Toppings</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {item.remove_toppings.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`remove-${option.name}`}
                                            checked={selectedOptions.removedToppings.includes(option.name)}
                                            onCheckedChange={(checked) => {
                                                setSelectedOptions(prev => ({
                                                    ...prev,
                                                    removedToppings: checked
                                                        ? [...prev.removedToppings, option.name]
                                                        : prev.removedToppings.filter(t => t !== option.name)
                                                }))
                                            }}
                                        />
                                        <Label htmlFor={`remove-${option.name}`}>{option.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* General Pizza Mod Section */}
                    {item?.general_pizza_mod && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">General Pizza Modifications</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {item.general_pizza_mod.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`mod-${option.name}`}
                                            checked={selectedOptions.modifications.includes(option.name)}
                                            onCheckedChange={(checked) => {
                                                setSelectedOptions(prev => ({
                                                    ...prev,
                                                    modifications: checked
                                                        ? [...prev.modifications, option.name]
                                                        : prev.modifications.filter(t => t !== option.name)
                                                }))
                                            }}
                                        />
                                        <Label htmlFor={`mod-${option.name}`}>{option.name}</Label>
                                        {option.price != 0 && (
                                            <span className="text-sm text-muted-foreground">
                                                +${option.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Salad Toppings Mod Section */}
                    {item?.salad_toppings_mod && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Salad Toppings Modifications</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {item.salad_toppings_mod.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`salad-mod-${option.name}`}
                                            checked={selectedOptions.saladMods.includes(option.name)}
                                            onCheckedChange={(checked) => {
                                                setSelectedOptions(prev => ({
                                                    ...prev,
                                                    saladMods: checked
                                                        ? [...prev.saladMods, option.name]
                                                        : prev.saladMods.filter(t => t !== option.name)
                                                }))
                                            }}
                                        />
                                        <Label htmlFor={`salad-mod-${option.name}`}>{option.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Choose Soda Section */}
                    {item?.choose_soda && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Choose Soda</h3>
                            <RadioGroup
                                value={selectedOptions.soda}
                                onValueChange={(value) => 
                                    setSelectedOptions(prev => ({...prev, soda: value}))
                                }
                            >
                                {item.choose_soda.options.map((option) => (
                                    <div key={option.name} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.name} id={`soda-${option.name}`} />
                                        <Label htmlFor={`soda-${option.name}`}>{option.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {/* Notes Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Notes for the Kitchen</h3>
                        <Textarea
                            placeholder="Add any special instructions or requests here..."
                            value={selectedOptions.notes}
                            onChange={(e) => setSelectedOptions(prev => ({...prev, notes: e.target.value}))}
                        />
                    </div>

                    <Separator />

                    {/* Price Breakdown Section */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Base Price:</span>
                            <span>${priceBreakdown.base.toFixed(2)}</span>
                        </div>
                        {priceBreakdown.toppings > 0 && (
                            <div className="flex justify-between">
                                <span>Extra Toppings:</span>
                                <span>+${priceBreakdown.toppings.toFixed(2)}</span>
                            </div>
                        )}
                        {priceBreakdown.extras > 0 && (
                            <div className="flex justify-between">
                                <span>Extras:</span>
                                <span>+${priceBreakdown.extras.toFixed(2)}</span>
                            </div>
                        )}
                        {priceBreakdown.modifications > 0 && (
                            <div className="flex justify-between">
                                <span>Modifications:</span>
                                <span>+${priceBreakdown.modifications.toFixed(2)}</span>
                            </div>
                        )}
                        {selectedOptions.quantity > 1 && (
                            <div className="flex justify-between font-medium">
                                <span>Subtotal × {selectedOptions.quantity}:</span>
                                <span>${(priceBreakdown.total / selectedOptions.quantity).toFixed(2)} × {selectedOptions.quantity}</span>
                            </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-medium text-base">
                            <span>Total:</span>
                            <span>${priceBreakdown.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Quantity and Add to Order Section */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(-1)}
                                disabled={selectedOptions.quantity <= 1}
                            >
                                <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{selectedOptions.quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(1)}
                            >
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button 
                            onClick={handleAddItem}
                            className="min-w-[200px]"
                        >
                            Add to Order
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

