'use client'

import * as z from "zod"
import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Copy } from 'lucide-react'
import { insertMenuItem, getRestaurants, getDishCategories } from "@/app/actions/restaurant-actions"

const standardJsonObjects = {
    chooseOption: `{
  "options": [
    {
      "name": "Option 1",
      "price": 0.00
    },
    {
      "name": "Option 2",
      "price": 1.50
    },
    {
      "name": "Option 3",
      "price": 2.00
    }
  ]
}`,
    chooseTopping: `{
  "pizza_type": [
    {
      "name": "10 inch"
    },
    {
      "name": "slice"
    }
  ],
  "options": [
    {
      "name": "Pepperoni"
    },
    {
      "name": "Meatballs"
    },
    {
      "name": "Canadian Bacon"
    },
    {
      "name": "Fresh Basil"
    },
    {
      "name": "Green Peppers"
    }
  ]
}`,
    addToppings: `{
  "pizza_type": [
    {
      "name": "10 inch"
    },
    {
      "name": "slice"
    }
  ],
  "options": [
    {
      "name": "Pepperoni"
    },
    {
      "name": "Meatballs"
    },
    {
      "name": "Canadian Bacon"
    },
    {
      "name": "Fresh Basil"
    },
    {
      "name": "Green Peppers"
    },
    {
      "name": "Onions"
    },
    {
      "name": "Spinach"
    },
    {
      "name": "Artichoke Hearts"
    },
    {
      "name": "Genoa Salami"
    },
    {
      "name": "Sausage"
    },
    {
      "name": "Ham"
    },
    {
      "name": "Garlic"
    },
    {
      "name": "Mushrooms"
    },
    {
      "name": "Pineapple"
    },
    {
      "name": "Jalapenos"
    },
    {
      "name": "Black Olives"
    },
    {
      "name": "Anchovies"
    },
    {
      "name": "Roma Tomatoes"
    },
    {
      "name": "Chicken"
    },
    {
      "name": "Extra Cheese"
    },
    {
      "name": "Vegan Cheese"
    },
    {
      "name": "Bacon"
    },
    {
      "name": "Red Onions"
    },
    {
      "name": "Eggplant"
    }
  ]
}`,
    chooseSalad: `{
  "options": [
    {
      "name": "Salad 1",
      "price": 3.00
    },
    {
      "name": "Salad 2",
      "price": 3.50
    },
    {
      "name": "Salad 3",
      "price": 4.00
    }
  ]
}`,
    choosePasta: `{
  "options": [
    {
      "name": "Pasta 1",
      "price": 8.00
    },
    {
      "name": "Pasta 2",
      "price": 9.00
    },
    {
      "name": "Pasta 3",
      "price": 10.00
    }
  ]
}`,
    addExtra: `{
  "options": [
    {
      "name": "Extra 1",
      "price": 1.00
    },
    {
      "name": "Extra 2",
      "price": 1.50
    },
    {
      "name": "Extra 3",
      "price": 2.00
    }
  ]
}`,
    removeToppings: `{
  "options": [
    {
      "name": "Pepperoni"
    },
    {
      "name": "Meatballs"
    },
    {
      "name": "Canadian Bacon"
    },
    {
      "name": "Fresh Basil"
    },
    {
      "name": "Green Peppers"
    },
    {
      "name": "Onions"
    },
    {
      "name": "Spinach"
    },
    {
      "name": "Artichoke Hearts"
    }
  ]
}`,
    generalPizzaMod: `{
  "options": [
    {
      "name": "No Cheese",
      "price": 0
    },
    {
      "name": "Light Cheese",
      "price": 0
    },
    {
      "name": "No Sauce",
      "price": 0
    },
    {
      "name": "Light Sauce",
      "price": 0
    },
    {
      "name": "Extra Sauce",
      "price": 0.50
    },
    {
      "name": "Double Cut",
      "price": 0
    },
    {
      "name": "Well Done",
      "price": 0
    },
    {
      "name": "Light Cook",
      "price": 0
    },
    {
      "name": "Square Cut",
      "price": 0
    },
    {
      "name": "Gluten Free",
      "price": 0
    },
    {
      "name": "16 Slices",
      "price": 0
    }
  ]
}`,
    saladToppingsMod: `{
  "options": [
    {
      "name": "No Onions",
      "price": 0
    },
    {
      "name": "No Croutons",
      "price": 0
    },
    {
      "name": "No Tomatoes",
      "price": 0
    },
    {
      "name": "No Pepperoncini",
      "price": 0
    },
    {
      "name": "No Cheese",
      "price": 0
    },
    {
      "name": "No Olives",
      "price": 0
    },
    {
      "name": "Extra Olives",
      "price": 0
    },
    {
      "name": "Cheese",
      "price": 0
    },
    {
      "name": "Croutons",
      "price": 0
    },
    {
      "name": "Chicken",
      "price": 0
    },
    {
      "name": "Crouton on Side",
      "price": 0
    },
    {
      "name": "Dressing on the Side",
      "price": 0
    }
  ]
}`,
    chooseSoda: `{
  "options": [
    {
      "name": "Coke",
      "price": 0
    },
    {
      "name": "Diet Coke",
      "price": 0
    },
    {
      "name": "Sprite",
      "price": 0
    }
  ]
}`
}


function JsonCopyButton({ jsonKey }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(standardJsonObjects[jsonKey])
        toast.success("Copied to clipboard!")
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-64 overflow-y-auto">
                {/* <pre className="text-xs">{JSON.stringify(standardJsonObjects[jsonKey], null, 2)}</pre> */}
                <pre className="text-xs">{standardJsonObjects[jsonKey]}</pre>
                <Button onClick={copyToClipboard} className="mt-2 w-full">Copy to Clipboard</Button>
            </PopoverContent>
        </Popover>
    )
}

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    restaurantId: z.string().min(1, { message: "Please select a restaurant." }),
    dishCategoryId: z.string().min(1, { message: "Please select a dish category." }),
    chooseOption: z.string().min(1, { message: "Choose Option is required." }).refine(
        (value) => {
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Choose Option" }
    ),
    chooseTopping: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Choose Topping" }
    ),
    addToppings: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Add Toppings" }
    ),
    chooseSalad: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Choose Salad" }
    ),
    choosePasta: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Choose Pasta" }
    ),
    addExtra: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Add Extra" }
    ),
    removeToppings: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Remove Toppings" }
    ),
    generalPizzaMod: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for General Pizza Mod" }
    ),
    saladToppingsMod: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Salad Toppings Mod" }
    ),
    chooseSoda: z.string().optional().refine(
        (value) => {
            if (!value) return true;
            try {
                const parsed = JSON.parse(value);
                return parsed && typeof parsed === 'object' && Array.isArray(parsed.options);
            } catch {
                return false;
            }
        },
        { message: "Invalid JSON format for Choose Soda" }
    ),
})

export default function AddMenuItems() {
    const [restaurants, setRestaurants] = useState([])
    const [dishCategories, setDishCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [formKey, setFormKey] = useState(0)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            restaurantId: "",
            dishCategoryId: "",
            chooseOption: "",
            chooseTopping: "",
            addToppings: "",
            chooseSalad: "",
            choosePasta: "",
            addExtra: "",
            removeToppings: "",
            generalPizzaMod: "",
            saladToppingsMod: "",
            chooseSoda: "",
        },
    })

    useEffect(() => {
        async function fetchRestaurants() {
            const fetchedRestaurants = await getRestaurants()
            console.log(fetchedRestaurants.restaurants)
            setRestaurants(fetchedRestaurants.restaurants)
        }
        fetchRestaurants()
    }, [])

    useEffect(() => {
        async function fetchDishCategories() {
            const restaurantId = form.getValues().restaurantId
            if (restaurantId) {
                const fetchedCategories = await getDishCategories(restaurantId)
                setDishCategories(fetchedCategories.dish_categories)
            } else {
                setDishCategories([])
            }
        }
        fetchDishCategories()
    }, [form.watch('restaurantId')])

    async function onSubmit(values) {
        setIsLoading(true)
        try {
            const menuItemData = {
                ...values,
                chooseOption: values.chooseOption ? JSON.parse(values.chooseOption) : null,
                chooseTopping: values.chooseTopping ? JSON.parse(values.chooseTopping) : null,
                addToppings: values.addToppings ? JSON.parse(values.addToppings) : null,
                chooseSalad: values.chooseSalad ? JSON.parse(values.chooseSalad) : null,
                choosePasta: values.choosePasta ? JSON.parse(values.choosePasta) : null,
                addExtra: values.addExtra ? JSON.parse(values.addExtra) : null,
                removeToppings: values.removeToppings ? JSON.parse(values.removeToppings) : null,
                generalPizzaMod: values.generalPizzaMod ? JSON.parse(values.generalPizzaMod) : null,
                saladToppingsMod: values.saladToppingsMod ? JSON.parse(values.saladToppingsMod) : null,
                chooseSoda: values.chooseSoda ? JSON.parse(values.chooseSoda) : null,
            }

            const result = await insertMenuItem(menuItemData)
            if (result.success) {
                toast.success(result.message)
                form.reset()
                setFormKey(prevKey => prevKey + 1)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            toast.error("An error occurred while submitting the form.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Menu Item</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Menu Item</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new menu item below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form} key={formKey}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="restaurantId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Restaurant</FormLabel>
                                    <Select onValueChange={(value) => {
                                        field.onChange(value);
                                        form.setValue('dishCategoryId', '');
                                    }} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a restaurant" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {restaurants.map((restaurant) => (
                                                <SelectItem key={restaurant.id} value={restaurant.id}>
                                                    {restaurant.business_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dishCategoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dish Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!form.getValues().restaurantId}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a dish category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {dishCategories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter dish name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="chooseOption"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Choose Option</FormLabel>
                                        <JsonCopyButton jsonKey="chooseOption" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (only one is possible)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="chooseTopping"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Choose Topping</FormLabel>
                                        <JsonCopyButton jsonKey="chooseTopping" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (only one is possible or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="addToppings"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Add Toppings</FormLabel>
                                        <JsonCopyButton jsonKey="addToppings" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of allowable toppings" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of allowable toppings (or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="chooseSalad"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Choose Salad</FormLabel>
                                        <JsonCopyButton jsonKey="chooseSalad" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (only one is possible or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="choosePasta"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Choose Pasta</FormLabel>
                                        <JsonCopyButton jsonKey="choosePasta" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (only one is possible or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="addExtra"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Add Extra</FormLabel>
                                        <JsonCopyButton jsonKey="addExtra" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (several options possible or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="removeToppings"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Remove Toppings</FormLabel>
                                        <JsonCopyButton jsonKey="removeToppings" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (several options possible or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="generalPizzaMod"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>General Pizza Mod</FormLabel>
                                        <JsonCopyButton jsonKey="generalPizzaMod" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (several options possible or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="saladToppingsMod"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Salad Toppings Mod</FormLabel>
                                        <JsonCopyButton jsonKey="saladToppingsMod" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (several options possible or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="chooseSoda"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Choose Soda</FormLabel>
                                        <JsonCopyButton jsonKey="chooseSoda" />
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Enter JSON object of options" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter a JSON object of options (only one is possible or null)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Menu Item'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}