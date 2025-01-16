'use client'

import { useEffect, useState } from "react"
import { getMenuItems, getDishCategories } from "@/app/actions/restaurant-actions"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import ItemDialogWindow from "./item-dialog-window"

export default function AddItemsToOrder({ addItemToOrder }) {
    const [menuItems, setMenuItems] = useState([])
    const [dishCategories, setDishCategories] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const [dishCategoriesResponse, menuItemsResponse] = await Promise.all([
                getDishCategories(process.env.NEXT_PUBLIC_RESTAURANT_ID),
                getMenuItems(process.env.NEXT_PUBLIC_RESTAURANT_ID)
            ])

            if (dishCategoriesResponse.success) {
                setDishCategories(dishCategoriesResponse.dish_categories)
            } else {
                console.error(dishCategoriesResponse.message)
            }

            if (menuItemsResponse.success) {
                setMenuItems(menuItemsResponse.menu_items)
            } else {
                console.error(menuItemsResponse.message)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])

    const categoriesWithItems = dishCategories.filter(category => 
        menuItems.some(item => item.dish_category_id === category.id)
    )

    const hasItems = categoriesWithItems.length > 0

    return (
        <div className="space-y-4">
            <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Search menu items..." />
                <CommandList>
                    {isLoading ? (
                        <div className="p-4 text-center">Loading...</div>
                    ) : !hasItems ? (
                        <CommandEmpty>No items found.</CommandEmpty>
                    ) : (
                        <ScrollArea className={hasItems ? "h-72" : "h-auto"}>
                            {categoriesWithItems.map((category) => (
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
                    )}
                </CommandList>
            </Command>

            <ItemDialogWindow 
                item={selectedItem} 
                isDialogOpen={isDialogOpen} 
                setIsDialogOpen={setIsDialogOpen} 
                addItemToOrder={addItemToOrder} 
            />
        </div>
    )
}

