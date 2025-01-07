'use client'

import * as z from "zod"
import { useState } from 'react'
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { addNewRestaurant } from "@/app/actions/restaurant-actions"

const formSchema = z.object({
    businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
    businessAddress: z.string().min(5, { message: "Address must be at least 5 characters." }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    email_address: z.string().email({ message: "Invalid email address." }),
})

export default function NewRestaurantForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            businessAddress: "",
            phoneNumber: "",
            email_address: "",
        },
    })

    async function onSubmit(values) {
        setIsLoading(true)
        try {
            // console.log(values)
            const result = await addNewRestaurant(values)

            console.log("result")
            console.log(result)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
            // form.reset()
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
                <Button variant="outline">New Restaurant</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Restaurant</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new restaurant below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="businessName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter business name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="businessAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Restaurant'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}