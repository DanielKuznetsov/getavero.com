'use client'

import * as z from "zod"
import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { insertDishCategory } from "@/app/actions/restaurant-actions"
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
import { toast } from "sonner"
import { getRestaurants } from "@/app/actions/restaurant-actions"

const formSchema = z.object({
    categoryName: z.string().min(2, { message: "Category name must be at least 2 characters." }),
    restaurantId: z.string().min(1, { message: "Please select a restaurant." }),
})

export default function AddDishCategories() {
    const [isLoading, setIsLoading] = useState(false)
    const [restaurants, setRestaurants] = useState([])
    const [formKey, setFormKey] = useState(0)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryName: "",
            restaurantId: "",
        },
    })

    useEffect(() => {
        async function fetchRestaurants() {
            const fetchedRestaurants = await getRestaurants()

            if (fetchedRestaurants.success) {
                setRestaurants(fetchedRestaurants.restaurants)
            } else {
                toast.error(fetchedRestaurants.message)
            }
        }

        fetchRestaurants()
    }, [])

    async function onSubmit(values) {
        setIsLoading(true)
        try {
            // Here you would typically send the data to your backend
            console.log(values)
            const result = await insertDishCategory(values)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }

            form.reset({
                categoryName: "",
                restaurantId: "",
            });
            setFormKey(prevKey => prevKey + 1);
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
                <Button variant="outline">Add Dish Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Dish Category</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new dish category below.
                    </DialogDescription>
                </DialogHeader>
                <Form key={formKey} {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="categoryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter category name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="restaurantId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Restaurant</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a restaurant" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {restaurants.map((restaurant) => (
                                                <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                                                    {restaurant.business_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Category'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

