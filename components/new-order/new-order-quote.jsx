'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { addOrder } from "@/app/actions/order-actions"
import { getMenuItemsAndCategories } from "@/app/actions/restaurant-actions"
import OrderForm from "@/components/new-order/order-form"
import InvoiceDisplay from "@/components/new-order/invoice-display"
import * as z from "zod"

const generateQuoteNumber = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const formSchema = z.object({
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

export const defaultFormValues = {
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
    const [isLoading, setIsLoading] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const [quoteNumber, setQuoteNumber] = useState("")
    const [gratuity, setGratuity] = useState(0)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultFormValues,
    })

    useEffect(() => {
        const gratuityAmount = form.getValues().gratuityAmount;
        const gratuityType = form.getValues().gratuityType;
        const subtotal = calculateSubtotal();
        let newGratuity = gratuityType === '$'
            ? gratuityAmount
            : (subtotal * (gratuityAmount / 100));

        if (isNaN(newGratuity)) {
            console.log("newGratuity is NaN")
            newGratuity = 0;
        }

        setGratuity(newGratuity);
    }, [form.watch('gratuityAmount'), form.watch('gratuityType'), orderItems]);

    useEffect(() => {
        const generatedQuoteNumber = generateQuoteNumber();
        setQuoteNumber(generatedQuoteNumber);
    }, []);

    async function onSubmit(values) {
        if (orderItems.length === 0) {
            toast.error("Please add at least one item to the order before submitting.")
            return
        }

        console.log("values", values)
        console.log("orderItems", orderItems)

        // Uncomment the following code when ready to submit the order
        /*
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
        */
    }

    function addItemToOrder(item) {
        setOrderItems(prevItems => [...prevItems, item])
    }

    function removeItemFromOrder(index) {
        setOrderItems(prevItems => prevItems.filter((_, i) => i !== index))
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

    return (
        <div className="py-4 px-6">
            <div className="border-b border-gray-200 pb-12">
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">New catering order form</h1>
                <p className="text-sm text-gray-500">Please fill out the form below to start a new order. Once you submit the form, you will be redirected to the order page. There you will be able to update the order, download the quote and/or invoice, and pay for the order by including a PO number.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
                        <OrderForm
                            form={form}
                            addItemToOrder={addItemToOrder}
                        />

                        <div className='mt-6 flex justify-end'>
                            <Button type="submit">
                                {isLoading ? 'Creating order...' : 'Create order'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            <InvoiceDisplay
                quoteNumber={quoteNumber}
                form={form}
                orderItems={orderItems}
                removeItemFromOrder={removeItemFromOrder}
                calculateSubtotal={calculateSubtotal}
                calculateTax={calculateTax}
                calculateGratuity={calculateGratuity}
                calculateInvoiceProcessingFee={calculateInvoiceProcessingFee}
                calculateTotal={calculateTotal}
            />
        </div>
    )
}

