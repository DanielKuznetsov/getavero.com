'use client'

import * as z from "zod"
import React, { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from "next/image"
import logo from "@/public/logo.png"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { addOrder } from "@/app/actions/order-actions"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { pizzaToppings, pizzaMods, pizzaSizes, menuItems, salads, saladSizes, saladMods } from "@/lib/menu-data"
import { Trash2 } from 'lucide-react'
import { getMenuItemsAndCategories } from "@/app/actions/restaurant-actions"

const formSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    pickupOrDelivery: z.enum(["pick-up", "delivery"]),
    paymentMethod: z.enum(["credit card", "purchase order"]),
    deliveryAddress: z.string().optional(),
    deliveryInstructions: z.string().optional(),
    preparedBy: z.string().min(2, { message: "Enter name of person creating the order." }),
    gratuityAmount: z.number().min(0, { message: "Gratuity amount must be 0 or greater." }),
    gratuityType: z.enum(["$", "%"])
})

const defaultFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pickupOrDelivery: "delivery",
    paymentMethod: "purchase order",
    deliveryAddress: "",
    deliveryInstructions: "",
    preparedBy: "",
    gratuityAmount: 0,
    gratuityType: "$"
}

export default function NewOrderQuote() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultFormValues,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const [isClient, setIsClient] = useState(false)
    const [quoteNumber] = useState(() => Date.now())
    const [editingItem, setEditingItem] = useState(null)
    const [gratuity, setGratuity] = useState(0);
    const [menuItems, setMenuItems] = useState([])
    const [dishCategories, setDishCategories] = useState([])
    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        const fetchMenuItems = async () => {
            const response = await getMenuItemsAndCategories(process.env.NEXT_PUBLIC_MAIN_RESTAURANT_ID);
            if (response.success) {
                setMenuItems(response.menu_items);
                setDishCategories(response.dish_categories);
            }
        };

        fetchMenuItems();
    }, []);

    useEffect(() => {
        const gratuityAmount = form.getValues().gratuityAmount;
        const gratuityType = form.getValues().gratuityType;
        const subtotal = calculateSubtotal();
        const newGratuity = gratuityType === '$' ? gratuityAmount : (subtotal * (gratuityAmount / 100));
        setGratuity(newGratuity);
    }, [form.watch('gratuityAmount'), form.watch('gratuityType'), orderItems]);

    async function onSubmit(values) {
        if (orderItems.length === 0) {
            toast.error("Please add at least one item to the order before submitting.")
            return
        }

        // if (values.deliveryAddress === "" || values.deliveryAddress === null || values.deliveryInstructions === "" || values.deliveryInstructions === null) {
        //     toast.error("Please fill out the delivery address and instructions before submitting.")
        //     return
        // }

        setIsLoading(true)

        try {
            const orderData = {
                ...values,
                orderItems,
                subtotal: calculateSubtotal(),
                tax: calculateTax(),
                gratuity: calculateGratuity(),
                processingFee: calculateInvoiceProcessingFee(),
                total: calculateTotal(),
                quoteNumber: quoteNumber,
                created_on: new Date().toLocaleDateString()
            }

            const response = await addOrder(orderData)

            if (response.success) {
                toast.success(response.message)
                form.reset(defaultFormValues)
                setOrderItems([])
                router.push("/")
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            toast.error("An error occurred while submitting the form.")
        } finally {
            setIsLoading(false)
        }
    }

    function addItemToOrder(item) {
        setOrderItems(prevItems => [...prevItems, item])
    }

    function removeItemFromOrder(index) {
        setOrderItems(prevItems => prevItems.filter((_, i) => i !== index))
    }

    function updateItemInOrder(index, updatedItem) {
        setOrderItems(prevItems => prevItems.map((item, i) => i === index ? updatedItem : item))
        setEditingItem(null)
    }

    function calculateSubtotal() {
        return orderItems.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
    }

    function calculateTax() {
        return calculateSubtotal() * 0.095
    }

    function calculateGratuity() {
        return gratuity;
    }

    function calculateInvoiceProcessingFee() {
        return 4.99
    }

    function calculateTotal() {
        return calculateSubtotal() + calculateTax() + calculateGratuity() + calculateInvoiceProcessingFee()
    }

    if (!isClient) {
        return null
    }

    return (
        <div className="py-4 px-6">
            <div className="border-b border-gray-200 pb-12">
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">New catering order form</h1>
                <p className="text-sm text-gray-500">Please fill out the form below to start a new order. Once you submit the form, you will be redirected to the order page. There you will be able to update the order, download the quote and/or invoice, and pay for the order by including a PO number.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
                        <div className="space-y-10">
                            <div className='space-y-2'>
                                <p className="scroll-m-20 text-xl font-semibold tracking-tight">Customer Information</p>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 space-y-0 space-x-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-[#1f2937]'>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John" {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-[#1f2937]'>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 space-y-0 space-x-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-[#1f2937]'>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phoneNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-[#1f2937]'>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="(123) 456-7890" {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <p className="scroll-m-20 text-xl font-semibold tracking-tight">Order Details</p>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 space-y-0 space-x-4">
                                        <FormField
                                            control={form.control}
                                            name="pickupOrDelivery"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Order Type</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select pickup or delivery" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="pick-up">Pickup</SelectItem>
                                                            <SelectItem value="delivery">Delivery</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="paymentMethod"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Method</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select payment method" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="credit card">Credit Card</SelectItem>
                                                            <SelectItem value="purchase order">Purchase Order</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 space-y-0 space-x-4">
                                        <FormField
                                            control={form.control}
                                            name="deliveryAddress"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-[#1f2937]'>Delivery Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="280 Charles E Young Dr S, Los Angeles, CA 90095" {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="deliveryInstructions"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-[#1f2937]'>Delivery Instructions</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Young Research Library, meet at the loading dock" {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 space-y-0 space-x-4">
                                        <FormField
                                            control={form.control}
                                            name="preparedBy"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='text-[#1f2937]'>Prepared By</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Name of person creating the order" {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-xs' />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex space-x-2">
                                            <FormField
                                                control={form.control}
                                                name="gratuityAmount"
                                                render={({ field }) => (
                                                    <FormItem className="flex-grow">
                                                        <FormLabel className='text-[#1f2937]'>Gratuity</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="0"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    field.onChange(parseFloat(e.target.value));
                                                                    form.trigger('gratuityAmount');
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='text-xs' />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="gratuityType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className='text-[#1f2937]'>Type</FormLabel>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                form.trigger('gratuityType');
                                                            }}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="$" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="$">$</SelectItem>
                                                                <SelectItem value="%">%</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage className='text-xs' />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Form for adding items to the order */}
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-sm">Add items to the order</Label>
                                        {/* <OrderForm addItemToOrder={addItemToOrder} menuItems={menuItems} dishCategories={dishCategories} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-6 flex justify-end'>
                            <Button type="submit" disabled={isLoading || orderItems.length === 0 || !form.getValues().deliveryAddress || !form.getValues().deliveryInstructions || !form.getValues().preparedBy}>
                                {isLoading ? 'Creating order...' : 'Create order'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            <div className="mt-12">
                <div className="flex items-center justify-between">
                    <Image src={logo} alt="Enzo's Pizzeria" width={150} height={150} />
                    <div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Quote #{String(quoteNumber).slice(-5)}</h4>
                        <p>Created on: {new Date().toLocaleDateString()}</p>
                        <p>Prepared by: {form.getValues().preparedBy}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-16">
                    <div>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">Billing from:</p>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Enzo's Pizzeria</h4>

                        <div className="mt-2">
                            <p className="text-sm leading-6">Address: <span className="text-gray-500">1145 Westwood Blvd, Los Angeles, CA 90024</span></p>
                            <p className="text-sm leading-6">Phone: <span className="text-gray-500">(310) 208-3696</span></p>
                            <p className="text-sm leading-6">Email: <span className="text-gray-500">enzospizzeria23@gmail.com</span></p>
                        </div>
                    </div>

                    <div>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">Billing to:</p>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">UCLA Accounts Payable</h4>

                        <div className="mt-2">
                            <p className="text-sm leading-6">Address: <span className="text-gray-500">10920 Wilshire Blvd, Suite 500 North, Los Angeles, CA 90024</span></p>
                            <p className="text-sm leading-6">Payee Identifier: <span className="text-gray-500">MMSKRESTAURANT23</span></p>
                            <p className="text-sm leading-6">Vendor ID: <span className="text-gray-500">158062004</span></p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="grid grid-cols-7 border-t border-b border-gray-200">
                        <p className="text-md font-semibold leading-7 border-r border-gray-200 py-2 px-4">Dish Name</p>
                        <p className="text-md font-semibold leading-7 border-r border-gray-200 py-2 px-4">Quantity</p>
                        <p className="text-md font-semibold leading-7 border-r border-gray-200 py-2 px-4">Base Price</p>
                        <p className="text-md font-semibold leading-7 border-r border-gray-200 py-2 px-4">Modifications</p>
                        <p className="text-md font-semibold leading-7 border-r border-gray-200 py-2 px-4">Notes</p>
                        <p className="text-md font-semibold leading-7 border-r border-gray-200 py-2 px-4">Total</p>
                        <p className="text-md font-semibold leading-7 py-2 px-4">Actions</p>
                    </div>

                    {orderItems.length === 0 ? (
                        <div className="col-span-7 text-center py-8 bg-gray-50 border-b border-gray-200">
                            <p className="text-lg font-semibold text-gray-500">Your order is empty</p>
                            <p className="text-sm text-gray-400">Add some delicious items to get started!</p>
                        </div>
                    ) : (
                        orderItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="grid grid-cols-7 border-b border-gray-200 items-center">
                                    <p className="py-2 px-4 text-sm">{item.name} {item.size && `(${item.size})`}</p>
                                    <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                    <p className="py-2 px-4 text-sm">
                                        ${Array.isArray(item.basePrice) 
                                            ? item.basePrice[0].toFixed(2) + ' - ' + item.basePrice[item.basePrice.length - 1].toFixed(2)
                                            : (typeof item.basePrice === 'number' 
                                                ? item.basePrice.toFixed(2) 
                                                : '0.00'
                                              )
                                        }
                                    </p>
                                    <p className="py-2 px-4 text-sm">
                                        {item.extraToppings && Object.keys(item.extraToppings).length > 0 && 'Extra Toppings'}
                                        {item.removedToppings && item.removedToppings.length > 0 && 'Removed Toppings'}
                                        {item.mods && Object.keys(item.mods).length > 0 && 'Modifications'}
                                    </p>
                                    <p className="py-2 px-4 text-sm">{item.notes || '-'}</p>
                                    <p className="py-2 px-4 text-sm">${item.totalPrice.toFixed(2)}</p>
                                    <div className="py-2 px-4 text-sm flex space-x-2 flex items-center justify-start">
                                        <Button size="sm" variant="outline" onClick={() => removeItemFromOrder(index)}>
                                            Delete <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {item.extraToppings && Object.entries(item.extraToppings).map(([topping, placement]) => (
                                    placement !== 'none' && (
                                        <div key={`${index}-${topping}`} className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                            <p className="py-2 px-4 text-sm"></p>
                                            <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                            <p className="py-2 px-4 text-sm">
                                                ${((pizzaToppings.find(t => t.name === topping)?.price || 0) *
                                                    (placement === 'whole' ? 1 : 0.5) *
                                                    (pizzaSizes.find(s => s.size === item.size)?.toppingPrice || 1) /
                                                    pizzaSizes[0].toppingPrice).toFixed(2)}
                                            </p>
                                            <p className="py-2 px-4 text-sm">{topping} ({placement})</p>
                                            <p className="py-2 px-4 text-sm">-</p>
                                            <p className="py-2 px-4 text-sm">
                                                ${((pizzaToppings.find(t => t.name === topping)?.price || 0) *
                                                    (placement === 'whole' ? 1 : 0.5) *
                                                    (pizzaSizes.find(s => s.size === item.size)?.toppingPrice || 1) /
                                                    pizzaSizes[0].toppingPrice *
                                                    item.quantity).toFixed(2)}
                                            </p>
                                            <p className="py-2 px-4 text-sm"></p>
                                        </div>
                                    )
                                ))}
                                {item.removedToppings && item.removedToppings.map((topping) => (
                                    <div key={`${index}-${topping}-removed`} className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                        <p className="py-2 px-4 text-sm"></p>
                                        <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                        <p className="py-2 px-4 text-sm">$0.00</p>
                                        <p className="py-2 px-4 text-sm">Remove {topping}</p>
                                        <p className="py-2 px-4 text-sm">-</p>
                                        <p className="py-2 px-4 text-sm">$0.00</p>
                                        <p className="py-2 px-4 text-sm"></p>
                                    </div>
                                ))}
                                {item.mods && Object.entries(item.mods).map(([mod, isSelected]) => (
                                    isSelected && (
                                        <div key={`${index}-${mod}`} className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                            <p className="py-2 px-4 text-sm"></p>
                                            <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                            <p className="py-2 px-4 text-sm">
                                                ${(pizzaMods.find(m => m.name === mod)?.price || 0).toFixed(2)}
                                            </p>
                                            <p className="py-2 px-4 text-sm">{mod}</p>
                                            <p className="py-2 px-4 text-sm">-</p>
                                            <p className="py-2 px-4 text-sm">
                                                ${((pizzaMods.find(m => m.name === mod)?.price || 0) * item.quantity).toFixed(2)}
                                            </p>
                                            <p className="py-2 px-4 text-sm"></p>
                                        </div>
                                    )
                                ))}
                                {item.salad && (
                                    <div key={`${index}-${item.salad}`} className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                        <p className="py-2 px-4 text-sm"></p>
                                        <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                        <p className="py-2 px-4 text-sm">$0.00</p>
                                        <p className="py-2 px-4 text-sm">{item.salad}</p>
                                        <p className="py-2 px-4 text-sm">-</p>
                                        <p className="py-2 px-4 text-sm">$0.00</p>
                                        <p className="py-2 px-4 text-sm"></p>
                                    </div>
                                )}
                                {item.saladMods && Object.entries(item.saladMods).map(([mod, isSelected]) => (
                                    isSelected && (
                                        <div key={`${index}-${mod}`} className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                            <p className="py-2 px-4 text-sm"></p>
                                            <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                            <p className="py-2 px-4 text-sm">$0.00</p>
                                            <p className="py-2 px-4 text-sm">{mod}</p>
                                            <p className="py-2 px-4 text-sm">-</p>
                                            <p className="py-2 px-4 text-sm">$0.00</p>
                                            <p className="py-2 px-4 text-sm"></p>
                                        </div>
                                    )
                                ))}
                            </React.Fragment>
                        ))
                    )}

                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                            <p>Subtotal:</p>
                            <p>${calculateSubtotal().toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tax (9.5%):</p>
                            <p>${calculateTax().toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Gratuity:</p>
                            <p>${calculateGratuity().toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Invoice Processing Fee:</p>
                            <p>${calculateInvoiceProcessingFee().toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between font-bold">
                            <p>Total:</p>
                            <p>${calculateTotal().toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

