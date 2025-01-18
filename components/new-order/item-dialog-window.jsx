'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MinusCircle, PlusCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const shouldShowHalfWholeOption = (itemName) => {
  const lowerCaseName = itemName.toLowerCase();
  return lowerCaseName.includes('pizza') && 
         !lowerCaseName.includes('pizza special') &&
         !lowerCaseName.includes('calzone') &&
         !lowerCaseName.includes('slice');
};

export default function ItemDialogWindow({ item, isDialogOpen, setIsDialogOpen, addItemToOrder }) {
    const initialOptions = {
        size: item?.choose_option?.options[0]?.name || '',
        topping: '',
        salad: '',
        pasta: '',
        soda: '',
        extraToppings: [],
        extraToppingPortions: {},
        extraToppingHalves: {},
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
            toppings: [],
            extras: [],
            modifications: [],
            total: 0
        };
        
        // Base price from chosen size
        const chosenOption = item?.choose_option?.options.find(
            opt => opt.name === selectedOptions.size
        );
        breakdown.base = chosenOption?.price || 0;

        // Extra toppings price
        const toppingPrice = getToppingPrice();
        selectedOptions.extraToppings.forEach(topping => {
            const portion = selectedOptions.extraToppingPortions[topping];
            const half = selectedOptions.extraToppingHalves[topping];
            const price = toppingPrice * (portion === 'half' ? 0.5 : 1);
            breakdown.toppings.push({
                name: topping,
                price: price,
                portion: portion,
                half: half
            });
        });

        // Add extra items price
        if (item?.add_extra?.options) {
            selectedOptions.extras.forEach(extraName => {
                const extraItem = item.add_extra.options.find(opt => opt.name === extraName);
                breakdown.extras.push({
                    name: extraName,
                    price: extraItem?.price || 0
                });
            });
        }

        // Add modification prices
        if (item?.general_pizza_mod?.options) {
            selectedOptions.modifications.forEach(modName => {
                const mod = item.general_pizza_mod.options.find(opt => opt.name === modName);
                breakdown.modifications.push({
                    name: modName,
                    price: mod?.price || 0
                });
            });
        }

        breakdown.total = (
            breakdown.base + 
            breakdown.toppings.reduce((sum, topping) => sum + topping.price, 0) +
            breakdown.extras.reduce((sum, extra) => sum + extra.price, 0) +
            breakdown.modifications.reduce((sum, mod) => sum + mod.price, 0)
        ) * selectedOptions.quantity;

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
                extraToppings: priceBreakdown.toppings.map(t => ({
                    name: t.name,
                    price: t.price,
                    portion: t.portion,
                    half: t.half
                })),
                extras: priceBreakdown.extras,
                removedToppings: selectedOptions.removedToppings,
                modifications: priceBreakdown.modifications,
                saladMods: selectedOptions.saladMods,
                quantity: selectedOptions.quantity,
                notes: selectedOptions.notes || undefined,
                priceBreakdown: {
                    base: priceBreakdown.base,
                    toppings: priceBreakdown.toppings,
                    extras: priceBreakdown.extras,
                    modifications: priceBreakdown.modifications,
                    total: priceBreakdown.total
                },
                totalPrice: priceBreakdown.total
            };

            // Remove empty arrays and undefined properties
            Object.keys(orderItem).forEach(key => 
                (Array.isArray(orderItem[key]) && orderItem[key].length === 0) || orderItem[key] === undefined ? delete orderItem[key] : {}
            );

            addItemToOrder(orderItem);
            setIsDialogOpen(false);
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
                    <DialogDescription>{item?.description}</DialogDescription>
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

                    <div className="max-h-[400px] overflow-y-auto">
                        <Accordion type="single" collapsible className="w-full">
                            {/* Choose Topping Section */}
                            {item?.choose_topping && (
                                <AccordionItem value="choose-topping">
                                    <AccordionTrigger>Choose Topping</AccordionTrigger>
                                    <AccordionContent>
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
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* Choose Salad Section */}
                            {item?.choose_salad && (
                                <AccordionItem value="choose-salad">
                                    <AccordionTrigger>Choose Salad</AccordionTrigger>
                                    <AccordionContent>
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
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* Add Extra Toppings Section */}
                            {item?.add_toppings && (
                                <AccordionItem value="add-toppings">
                                    <AccordionTrigger>Add Extra Toppings</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-1 gap-4">
                                            {item.add_toppings.options.map((option) => (
                                                <div key={option.name} className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`extra-${option.name}`}
                                                            checked={selectedOptions.extraToppings.includes(option.name)}
                                                            onCheckedChange={(checked) => {
                                                                setSelectedOptions(prev => {
                                                                    const newExtraToppings = checked
                                                                        ? [...prev.extraToppings, option.name]
                                                                        : prev.extraToppings.filter(t => t !== option.name);
                                                                    const newExtraToppingPortions = {...prev.extraToppingPortions};
                                                                    if (checked) {
                                                                        newExtraToppingPortions[option.name] = 'whole';
                                                                    } else {
                                                                        delete newExtraToppingPortions[option.name];
                                                                    }
                                                                    return {
                                                                        ...prev,
                                                                        extraToppings: newExtraToppings,
                                                                        extraToppingPortions: newExtraToppingPortions
                                                                    };
                                                                });
                                                            }}
                                                        />
                                                        <Label htmlFor={`extra-${option.name}`}>{option.name}</Label>
                                                    </div>
                                                    {selectedOptions.extraToppings.includes(option.name) && shouldShowHalfWholeOption(item.name) && (
                                                        <div className="flex flex-col space-y-2">
                                                            <RadioGroup
                                                                value={selectedOptions.extraToppingPortions[option.name]}
                                                                onValueChange={(value) => {
                                                                    setSelectedOptions(prev => ({
                                                                        ...prev,
                                                                        extraToppingPortions: {
                                                                            ...prev.extraToppingPortions,
                                                                            [option.name]: value
                                                                        },
                                                                        extraToppingHalves: value === 'whole' 
                                                                            ? { ...prev.extraToppingHalves, [option.name]: undefined }
                                                                            : prev.extraToppingHalves
                                                                    }));
                                                                }}
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="half" id={`half-${option.name}`} />
                                                                    <Label htmlFor={`half-${option.name}`}>Half</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="whole" id={`whole-${option.name}`} />
                                                                    <Label htmlFor={`whole-${option.name}`}>Whole</Label>
                                                                </div>
                                                            </RadioGroup>
                                                            {selectedOptions.extraToppingPortions[option.name] === 'half' && (
                                                                <RadioGroup
                                                                    value={selectedOptions.extraToppingHalves[option.name]}
                                                                    onValueChange={(value) => {
                                                                        setSelectedOptions(prev => ({
                                                                            ...prev,
                                                                            extraToppingHalves: {
                                                                                ...prev.extraToppingHalves,
                                                                                [option.name]: value
                                                                            }
                                                                        }));
                                                                    }}
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value="left" id={`left-${option.name}`} />
                                                                        <Label htmlFor={`left-${option.name}`}>Left</Label>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value="right" id={`right-${option.name}`} />
                                                                        <Label htmlFor={`right-${option.name}`}>Right</Label>
                                                                    </div>
                                                                </RadioGroup>
                                                            )}
                                                        </div>
                                                    )}
                                                    <span className="text-sm text-muted-foreground">
                                                        +${(getToppingPrice() * (selectedOptions.extraToppingPortions[option.name] === 'half' ? 0.5 : 1)).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* Choose Pasta Section */}
                            {item?.choose_pasta && (
                                <AccordionItem value="choose-pasta">
                                    <AccordionTrigger>Choose Pasta</AccordionTrigger>
                                    <AccordionContent>
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
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* Add Extra Section */}
                            {item?.add_extra && (
                                <AccordionItem value="add-extra">
                                    <AccordionTrigger>Add Extra</AccordionTrigger>
                                    <AccordionContent>
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
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* Remove Toppings Section */}
                            {item?.remove_toppings && (
                                <AccordionItem value="remove-toppings">
                                    <AccordionTrigger>Remove Toppings</AccordionTrigger>
                                    <AccordionContent>
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
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* General Pizza Mod Section */}
                            {item?.general_pizza_mod && (
                                <AccordionItem value="general-pizza-mod">
                                    <AccordionTrigger>General Pizza Modifications</AccordionTrigger>
                                    <AccordionContent>
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
                                                    <Label htmlFor={`mod-${option.name}`}>
                                                        {option.name.replace(/0$/, '')}
                                                    </Label>
                                                    {option.price != 0 && (
                                                        <span className="text-sm text-muted-foreground">
                                                            +${option.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* Salad Toppings Mod Section */}
                            {item?.salad_toppings_mod && (
                                <AccordionItem value="salad-toppings-mod">
                                    <AccordionTrigger>Salad Toppings Modifications</AccordionTrigger>
                                    <AccordionContent>
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
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* Choose Soda Section */}
                            {item?.choose_soda && (
                                <AccordionItem value="choose-soda">
                                    <AccordionTrigger>Choose Soda</AccordionTrigger>
                                    <AccordionContent>
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
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {/* Notes Section */}
                            <AccordionItem value="notes">
                                <AccordionTrigger>Notes for the Kitchen</AccordionTrigger>
                                <AccordionContent>
                                    <Textarea
                                        placeholder="Add any special instructions or requests here..."
                                        value={selectedOptions.notes}
                                        onChange={(e) => setSelectedOptions(prev => ({...prev, notes: e.target.value}))}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>


                    {/* Price Breakdown Section */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Base Price ({selectedOptions.size}):</span>
                            <span>${priceBreakdown.base.toFixed(2)}</span>
                        </div>
                        {priceBreakdown.toppings.length > 0 && (
                            <div>
                                <span>Extra Toppings:</span>
                                {priceBreakdown.toppings.map((topping, index) => (
                                    <div key={index} className="flex justify-between pl-4">
                                        <span>
                                            {topping.name} 
                                            {shouldShowHalfWholeOption(item.name) && (
                                                <>
                                                    ({topping.portion}
                                                    {topping.portion === 'half' && ` - ${topping.half}`})
                                                </>
                                            )}
                                        </span>
                                        <span>+${topping.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {priceBreakdown.extras.length > 0 && (
                            <div>
                                <span>Extras:</span>
                                {priceBreakdown.extras.map((extra, index) => (
                                    <div key={index} className="flex justify-between pl-4">
                                        <span>{extra.name}:</span>
                                        <span>+${extra.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {priceBreakdown.modifications.length > 0 && (
                            <div>
                                <span>Modifications:</span>
                                {priceBreakdown.modifications.map((mod, index) => (
                                    <div key={index} className="flex justify-between pl-4">
                                        <span>{mod.name}:</span>
                                        <span>+${mod.price.toFixed(2)}</span>
                                    </div>
                                ))}
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

