'use client'

import { useEffect, useState } from "react"
import { getMenuItems, getDishCategories } from "@/app/actions/restaurant-actions"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import ItemDialogWindow from "./item-dialog-window"

export default function AddItemsToOrder({ addItemToOrder }) {
    const [menuItems, setMenuItems] = useState([])
    const [dishCategories, setDishCategories] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        const fetchDishCategories = async () => {
            const dishCategories = await getDishCategories(process.env.NEXT_PUBLIC_RESTAURANT_ID)

            if (dishCategories.success) {
                setDishCategories(dishCategories.dish_categories)
            } else {
                console.error(dishCategories.message)
            }
        }

        const fetchMenuItems = async () => {
            const menuItems = await getMenuItems(process.env.NEXT_PUBLIC_RESTAURANT_ID)

            if (menuItems.success) {
                setMenuItems(menuItems.menu_items)
            } else {
                console.error(menuItems.message)
            }
        }

        fetchDishCategories()
        fetchMenuItems()
    }, [])

    return (
        <div className="space-y-4">
            <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Search menu items..." />
                <CommandList>
                    <CommandEmpty>No items found.</CommandEmpty>
                    <ScrollArea className="h-72">
                        {dishCategories.map((category) => (
                            <CommandGroup key={category.id} heading={category.name}>
                                {menuItems
                                    .filter((item) => item.dish_category_id === category.id)
                                    .map((item) => (
                                        <CommandItem
                                            key={item.id}
                                            onSelect={() => {
                                                setSelectedItem(item)
                                                setIsDialogOpen(true)
                                            }}
                                        >
                                            <div className="flex justify-between w-full">
                                                <span>{item.name}</span>
                                            </div>
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        ))}
                    </ScrollArea>
                </CommandList>
            </Command>

            <ItemDialogWindow item={selectedItem} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} addItemToOrder={addItemToOrder} />
        </div>
    )
}

