'use client'

import { useState, useEffect } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { pizzas, pizzaSizes, pizzaToppings, pizzaMods } from '@/lib/menu-data'
import { ToppingSelector } from '@/components/ui/custom-small/topping-selector'
import { RemovableToppings } from '@/components/ui/custom-small/removable-toppings'
import { Checkbox } from '@/components/ui/checkbox'

export function OrderForm({ addItemToOrder }) {
    const [selectedSize, setSelectedSize] = useState(pizzaSizes[0].size);
    const [extraToppings, setExtraToppings] = useState({});
    const [removedToppings, setRemovedToppings] = useState([]);
    const [mods, setMods] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState("");
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (selectedPizza) {
            setSelectedSize(pizzaSizes[0].size);
            setExtraToppings({});
            setRemovedToppings([]);
            setMods({});
            setQuantity(1);
            setNotes("");
        }
    }, [selectedPizza]);

    const calculatePrice = (pizza) => {
        if (!pizza) return 0;
        const sizeIndex = pizzaSizes.findIndex(s => s.size === selectedSize);
        let basePrice;

        if (pizza.isSpecialty) {
            basePrice = pizza.specialtyPrices[sizeIndex];
        } else {
            basePrice = pizzaSizes[sizeIndex].basePrice;
        }

        let total = basePrice;

        Object.entries(extraToppings).forEach(([topping, placement]) => {
            if (placement !== "none") {
                const toppingPrice = pizzaToppings.find(t => t.name === topping)?.price;
                total += placement === "whole" ? toppingPrice : toppingPrice / 2;
            }
        });

        Object.entries(mods).forEach(([mod, isSelected]) => {
            if (isSelected) {
                const modification = pizzaMods.find(m => m.name === mod);
                if (modification?.price) {
                    total += modification.price;
                }
            }
        });

        return total * quantity;
    };

    const handleAddToOrder = () => {
        if (!selectedPizza) return;

        const newOrderItem = {
            ...selectedPizza,
            size: selectedSize,
            extraToppings,
            removedToppings,
            mods,
            quantity,
            notes,
            basePrice: selectedPizza.isSpecialty ? selectedPizza.specialtyPrices[0] : pizzaSizes[0].basePrice,
            totalPrice: calculatePrice(selectedPizza)
        };

        addItemToOrder(newOrderItem);
        setSelectedPizza(null);
        setIsDialogOpen(false);
    };

    const toggleRemovedTopping = (topping) => {
        setRemovedToppings(prev =>
            prev.includes(topping)
                ? prev.filter(t => t !== topping)
                : [...prev, topping]
        );
    };

    return (
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Search pizzas..." />
            <CommandList>
                <CommandEmpty>No pizzas found.</CommandEmpty>
                <CommandGroup heading="Pizzas">
                    {pizzas.map((pizza) => (
                        <CommandItem key={pizza.id}>
                            <div
                                className="flex justify-between w-full cursor-pointer"
                                onClick={() => {
                                    setSelectedPizza(pizza);
                                    setIsDialogOpen(true);
                                }}
                            >
                                <span>{pizza.name}</span>
                                <span className="text-gray-500">
                                    From ${pizza.isSpecialty ? pizza.specialtyPrices[0].toFixed(2) : pizzaSizes[0].basePrice.toFixed(2)}
                                </span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    {selectedPizza && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedPizza.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-6">
                                <p className="text-sm text-gray-500">{selectedPizza.description}</p>

                                {selectedPizza.defaultToppings && (
                                    <div className="space-y-2">
                                        <Label>Included Toppings</Label>
                                        <p className="text-sm text-gray-500">
                                            {selectedPizza.defaultToppings.join(", ")}
                                        </p>
                                    </div>
                                )}

                                <Separator />

                                <div className="space-y-4">
                                    <Label>Choose a size</Label>
                                    <RadioGroup
                                        value={selectedSize}
                                        onValueChange={setSelectedSize}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        {pizzaSizes.map((size, index) => (
                                            <div key={size.size} className="flex items-center space-x-2">
                                                <RadioGroupItem value={size.size} id={size.size} />
                                                <Label htmlFor={size.size}>
                                                    {size.size}
                                                    <span className="ml-2 text-gray-500">
                                                        ${selectedPizza.isSpecialty
                                                            ? selectedPizza.specialtyPrices[index].toFixed(2)
                                                            : size.basePrice.toFixed(2)}
                                                    </span>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <ScrollArea className="h-[300px] pr-4">
                                    <Accordion type="multiple" className="space-y-4">
                                        {selectedPizza.removableToppings && (
                                            <AccordionItem value="remove-toppings">
                                                <AccordionTrigger>Remove Toppings</AccordionTrigger>
                                                <AccordionContent>
                                                    <RemovableToppings
                                                        toppings={selectedPizza.removableToppings}
                                                        removedToppings={removedToppings}
                                                        onToggle={toggleRemovedTopping}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        {selectedPizza.allowExtraToppings && (
                                            <AccordionItem value="extra-toppings">
                                                <AccordionTrigger>Add Extra Toppings</AccordionTrigger>
                                                <AccordionContent className="space-y-4">
                                                    {pizzaToppings.map((topping) => (
                                                        <ToppingSelector
                                                            key={topping.name}
                                                            topping={topping}
                                                            value={extraToppings[topping.name] || "none"}
                                                            onChange={(value) => setExtraToppings({
                                                                ...extraToppings,
                                                                [topping.name]: value
                                                            })}
                                                        />
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        <AccordionItem value="mods">
                                            <AccordionTrigger>General Pizza Modifications</AccordionTrigger>
                                            <AccordionContent className="space-y-4">
                                                {pizzaMods.map((mod) => (
                                                    <div key={mod.name} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`mod-${mod.name}`}
                                                            checked={mods[mod.name] || false}
                                                            onCheckedChange={(checked) => setMods({
                                                                ...mods,
                                                                [mod.name]: checked
                                                            })}
                                                        />
                                                        <Label htmlFor={`mod-${mod.name}`}>
                                                            {mod.name}
                                                            {mod.price && <span className="ml-1 text-gray-500">+${mod.price.toFixed(2)}</span>}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </ScrollArea>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="notes">Notes for the kitchen</Label>
                                        <Input
                                            id="notes"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Any special requests?"
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </Button>
                                    <span>{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </Button>
                                </div>

                                <Button onClick={handleAddToOrder}>
                                    Add to Order ${calculatePrice(selectedPizza).toFixed(2)}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Command>
    );
}

