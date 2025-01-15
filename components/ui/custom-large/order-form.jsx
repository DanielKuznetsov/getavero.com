'use client'

import { useState, useEffect } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { toast } from "sonner"
import ChooseTopping from "@/components/ui/custom-large/menu-selectors/choose-topping"
// import AddToppings from "./ui/custom-large/menu-selectors/add-toppings"
// import ChooseSalad from "./ui/custom-large/menu-selectors/choose-salad"
// import ChoosePasta from "./ui/custom-large/menu-selectors/choose-pasta"
import AddExtra from "@/components/ui/custom-large/menu-selectors/add-extra"
// import RemoveToppings from "./ui/custom-large/menu-selectors/remove-toppings"
// import GeneralPizzaMods from "./ui/custom-large/menu-selectors/general-pizza-mods"
// import SaladToppingsMods from "./ui/custom-large/menu-selectors/salad-toppings-mods"
// import ChooseSoda from "./ui/custom-large/menu-selectors/choose-soda"

export function OrderForm({ addItemToOrder, menuItems, dishCategories }) {
    const [orderItems, setOrderItems] = useState({
        choose_option: null,
        toppings: [],
        salad: null,
        pasta: null,
        extra: [],
        removed_toppings: [],
        soda: null,
        general_mods: {},
        salad_mods: {},
        quantity: 1,
        notes: "",
    });

    const [selectedDish, setSelectedDish] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [expandedAccordions, setExpandedAccordions] = useState([]);

    useEffect(() => {
        if (selectedDish) {
            setOrderItems({
                choose_option: null,
                toppings: [],
                salad: null,
                pasta: null,
                extra: [],
                removed_toppings: [],
                soda: null,
                general_mods: {},
                salad_mods: {},
                quantity: 1,
                notes: "",
            })
            setExpandedAccordions([])
        }

        if (!isDialogOpen) {
            setSelectedDish(null);
        }
    }, [selectedDish, isDialogOpen]);

    const updateOrderItems = (newOrderItems) => {
        setOrderItems(newOrderItems)
    }

    const calculatePrice = () => {
        if (!selectedDish || !orderItems.choose_option) return 0

        let total = 0

        // Base price from choose_option
        const [optionName, index] = orderItems.choose_option.split('-')
        const baseOption = selectedDish.choose_option.options[parseInt(index)]
        total += baseOption.price

        // Add toppings price
        orderItems.toppings.forEach(topping => {
            total += topping.price || 0
        })

        // Add salad price
        if (orderItems.salad) {
            total += orderItems.salad.price
        }

        // Add pasta price
        if (orderItems.pasta) {
            total += orderItems.pasta.price
        }

        // Add extras price
        orderItems.extra.forEach(extra => {
            total += extra.price
        })

        // Add general mods price
        Object.values(orderItems.general_mods).forEach((mod) => {
            total += mod.price || 0
        })

        // Add soda price
        if (orderItems.soda) {
            total += orderItems.soda.price
        }

        return total * orderItems.quantity
    }

    const handleAddToOrder = () => {
        if (!orderItems.choose_option) {
            toast.error("Please select an option")
            return
        }

        const orderItem = {
            ...orderItems,
            name: selectedDish.name,
            price: calculatePrice(),
        }

        addItemToOrder(orderItem)
        setIsDialogOpen(false)
    }

    return (
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Search menu items..." />
            <CommandList>
                <CommandEmpty>No menu items found.</CommandEmpty>
                {dishCategories?.map((category) => (
                    <CommandGroup key={category.id} heading={category.name}>
                        {menuItems.filter(item => item.dish_category_id === category.id).map((item) => (
                            <CommandItem key={item.id}>
                                <div
                                    className="flex justify-between w-full cursor-pointer"
                                    onClick={() => {
                                        setSelectedDish(item);
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <span>{item.name}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
            </CommandList>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    {selectedDish && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedDish.name}</DialogTitle>
                            </DialogHeader>

                            <Separator />

                            <div className="grid gap-6">
                                <div className="space-y-4">
                                    <Label>Choose option</Label>
                                    <RadioGroup
                                        defaultValue={`${selectedDish.choose_option.options[0].name}-0`}
                                        onValueChange={(value) => setOrderItems({ ...orderItems, choose_option: value })}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        {selectedDish.choose_option.options.map((option, index) => (
                                            <div key={`${option.name}`} className="flex items-center space-x-2">
                                                <RadioGroupItem value={`${option.name}-${index}`} id={`${option.name}-${index}`} />
                                                <Label htmlFor={`${option.name}-${index}`}>
                                                    {option.name}
                                                    <span className="ml-2 text-gray-500">
                                                        ${option.price.toFixed(2)}
                                                    </span>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <ScrollArea className="h-[300px] pr-4">
                                    <Accordion
                                        type="multiple"
                                        value={expandedAccordions}
                                        onValueChange={setExpandedAccordions}
                                        className="space-y-4"
                                    >
                                        {selectedDish.choose_topping && (
                                            <AccordionItem value="choose-topping">
                                                <AccordionTrigger>Choose Topping (select only one)</AccordionTrigger>
                                                <AccordionContent>
                                                    <ChooseTopping
                                                        toppings={selectedDish.choose_topping.options}
                                                        priceName={selectedDish.choose_topping.pizza_type[0].name}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        {/* {selectedDish.add_toppings && (
                                            <AccordionItem value="add-toppings">
                                                <AccordionTrigger>Add Toppings</AccordionTrigger>
                                                <AccordionContent>
                                                    <AddToppings
                                                        toppings={selectedDish.add_toppings.options}
                                                        priceName={selectedDish.add_toppings.pizza_sizes[0].name}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )} */}

                                        {/* {selectedDish.choose_salad && (
                                            <AccordionItem value="choose-salad">
                                                <AccordionTrigger>Choose Salad (select only one)</AccordionTrigger>
                                                <AccordionContent>
                                                    <ChooseSalad
                                                        options={selectedDish.choose_salad.options}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        {selectedDish.choose_pasta && (
                                            <AccordionItem value="choose-pasta">
                                                <AccordionTrigger>Choose Pasta (select only one)</AccordionTrigger>
                                                <AccordionContent>
                                                    <ChoosePasta
                                                        options={selectedDish.choose_pasta.options}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )} */}

                                        {selectedDish.add_extra && (
                                            <AccordionItem value="add-extra">
                                                <AccordionTrigger>Add Extra</AccordionTrigger>
                                                <AccordionContent>
                                                    <AddExtra
                                                        options={selectedDish.add_extra.options}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        {/* {selectedDish.remove_toppings && (
                                            <AccordionItem value="remove-toppings">
                                                <AccordionTrigger>Remove Toppings</AccordionTrigger>
                                                <AccordionContent>
                                                    <RemoveToppings
                                                        toppings={selectedDish.remove_toppings.options}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )} */}

                                        {/* {selectedDish.general_pizza_mod && (
                                            <AccordionItem value="general-mods">
                                                <AccordionTrigger>General Modifications</AccordionTrigger>
                                                <AccordionContent>
                                                    <GeneralPizzaMods
                                                        mods={selectedDish.general_pizza_mod.options}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        {selectedDish.salad_toppings_mod && (
                                            <AccordionItem value="salad-mods">
                                                <AccordionTrigger>Salad Modifications</AccordionTrigger>
                                                <AccordionContent>
                                                    <SaladToppingsMods
                                                        mods={selectedDish.salad_toppings_mod.options}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )} */}

                                        {/* {selectedDish.choose_soda && (
                                            <AccordionItem value="choose-soda">
                                                <AccordionTrigger>Choose Soda</AccordionTrigger>
                                                <AccordionContent>
                                                    <ChooseSoda
                                                        options={selectedDish.choose_soda.options}
                                                        updateOrderItems={updateOrderItems}
                                                        orderItems={orderItems}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )} */}
                                    </Accordion>
                                </ScrollArea>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="notes">Notes for the kitchen</Label>
                                        <Input
                                            id="notes"
                                            value={orderItems.notes}
                                            onChange={(e) => setOrderItems({ ...orderItems, notes: e.target.value })}
                                            placeholder="Any special requests?"
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setOrderItems({
                                                ...orderItems,
                                                quantity: Math.max(1, orderItems.quantity - 1)
                                            })}
                                        >
                                            -
                                        </Button>
                                        <span>{orderItems.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setOrderItems({
                                                ...orderItems,
                                                quantity: orderItems.quantity + 1
                                            })}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Button onClick={handleAddToOrder}>
                                        Add to Order ${calculatePrice().toFixed(2)}
                                    </Button>
                                </div>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Command>
    );
}

