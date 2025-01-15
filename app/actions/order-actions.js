'use server';

import supabase from '@/utils/supabase/client';

export async function addOrder(orderData) {
    console.log(orderData);

    const { data: customer_data, error: customer_error } = await supabase.from("customers").insert({
        first_name: orderData.firstName,
        last_name: orderData.lastName,
        email_address: orderData.email,
        phone_number: orderData.phoneNumber,
    }).select("*")
        .single();

    if (customer_error) {
        console.log(customer_error);
        return { success: false, message: "Error adding customer" };
    }

    console.log("customer_data");
    console.log(customer_data);

    const { data: order_data, error: order_error } = await supabase.from("orders").insert({
        customer_id: customer_data.id,
        order_type: orderData.pickupOrDelivery,
        payment_method: orderData.paymentMethod,
        delivery_address: orderData.deliveryAddress,
        delivery_instructions: orderData.deliveryInstructions,
        prepared_by: orderData.preparedBy,

        order_itself: JSON.stringify(orderData.orderItems),
        quote_number: String(orderData.quoteNumber).slice(-5),
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        gratuity: orderData.gratuity,
        invoice_processing_fee: orderData.processingFee,
        total: orderData.total,
        created_on: orderData.created_on
    }).select();

    if (order_error) {
        console.log(order_error);
        return { success: false, message: "Error adding order" };
    }

    return { success: true, message: "Order added successfully", orderId: order_data[0].id, customerId: customer_data.id };
}