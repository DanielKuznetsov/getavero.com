import React from 'react'
import Image from "next/image"
import logo from "@/public/logo.png"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

const shouldShowHalfWholeOption = (itemName) => {
    const lowerCaseName = itemName.toLowerCase();
    return lowerCaseName.includes('pizza') &&
        !lowerCaseName.includes('pizza special') &&
        !lowerCaseName.includes('calzone') &&
        !lowerCaseName.includes('slice');
};

export default function InvoiceDisplay({
    quoteNumber,
    form,
    orderItems,
    removeItemFromOrder,
    calculateSubtotal,
    calculateTax,
    calculateGratuity,
    calculateInvoiceProcessingFee,
    calculateTotal
}) {
    console.log("orderItems")
    console.log(orderItems)
    return (
        <div className="mt-12">
            <div className="flex items-center justify-between">
                <Image src={logo || "/placeholder.svg"} alt="Enzo's Pizzeria" width={150} height={150} style={{ width: 'auto', height: 'auto' }} />
                <div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Quote #{quoteNumber}</h4>
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
                                <p className="py-2 px-4 text-sm">${item.priceBreakdown.base.toFixed(2)}</p>
                                <p className="py-2 px-4 text-sm">
                                    {/* {item.extraToppings && item.extraToppings.length > 0 && 'Extra Toppings'}
                                    {item.removedToppings && item.removedToppings.length > 0 && ', Removed Toppings'}
                                    {item.modifications && item.modifications.length > 0 && ', Modifications'} */}
                                    -
                                </p>
                                <p className="py-2 px-4 text-sm">{item.notes || '-'}</p>
                                <p className="py-2 px-4 text-sm">${item.totalPrice.toFixed(2)}</p>
                                <div className="py-2 px-4 text-sm flex space-x-2 flex items-center justify-start">
                                    <Button size="sm" variant="outline" onClick={() => removeItemFromOrder(index)}>
                                        Delete <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {item.extraToppings && item.extraToppings.map((topping, toppingIndex) => (
                                <div key={`${index}-${toppingIndex}`} className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                    <p className="py-2 px-4 text-sm"></p>
                                    <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                    <p className="py-2 px-4 text-sm">${topping.price.toFixed(2)}</p>
                                    <p className="py-2 px-4 text-sm">
                                        {topping.name}
                                        {shouldShowHalfWholeOption(item.name) && (
                                            <>
                                                {' '}({topping.portion}
                                                {topping.portion === 'half' && ` - ${topping.half}`})
                                            </>
                                        )}
                                    </p>
                                    <p className="py-2 px-4 text-sm">-</p>
                                    <p className="py-2 px-4 text-sm">${(topping.price * item.quantity).toFixed(2)}</p>
                                    <p className="py-2 px-4 text-sm"></p>
                                </div>
                            ))}

                            {item.removedToppings && item.removedToppings.map((topping, toppingIndex) => (
                                <div key={`${index}-${toppingIndex}-removed`} className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                    <p className="py-2 px-4 text-sm"></p>
                                    <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                    <p className="py-2 px-4 text-sm">$0.00</p>
                                    <p className="py-2 px-4 text-sm">Removed: {topping}</p>
                                    <p className="py-2 px-4 text-sm">-</p>
                                    <p className="py-2 px-4 text-sm">$0.00</p>
                                    <p className="py-2 px-4 text-sm"></p>
                                </div>
                            ))}

                            {item.modifications && item.modifications.map((mod, modIndex) => (
                                <div key={`${index}-${modIndex}`} className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                    <p className="py-2 px-4 text-sm"></p>
                                    <p className="py-2 px-4 text-sm">{item.quantity}</p>
                                    <p className="py-2 px-4 text-sm">${(mod.price || 0).toFixed(2)}</p>
                                    <p className="py-2 px-4 text-sm">{mod.name}</p>
                                    <p className="py-2 px-4 text-sm">-</p>
                                    <p className="py-2 px-4 text-sm">${((mod.price || 0) * item.quantity).toFixed(2)}</p>
                                    <p className="py-2 px-4 text-sm"></p>
                                </div>
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
    )
}

