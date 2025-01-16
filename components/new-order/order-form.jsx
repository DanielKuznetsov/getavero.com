import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import AddItemsToOrder from "@/components/new-order/add-items-to-order"

export default function OrderForm({ form, addItemToOrder }) {
    return (
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
                        <AddItemsToOrder addItemToOrder={addItemToOrder} />
                    </div>
                </div>
            </div>
        </div>
    )
}

