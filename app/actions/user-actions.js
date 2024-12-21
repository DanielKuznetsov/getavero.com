'use server'

import supabase from "@/utils/supabase/client"
import { currentUser } from '@clerk/nextjs/server'

export async function getUser() {
    const user = await currentUser();

    if (!user) {
        console.error("User not found");
        return { success: false, error: "User not found" };
    }

    const { data, error } = await supabase.from('users').select('*').eq('clerk_id', user.id).single();

    if (error) {
        console.error(error);
        return { success: false, error: error.message };
    } else {
        // console.log("Successfully retrieved user from Supabase");
        return { success: true, user: data };
    }
}

export async function addToWaitlist(values) {
    console.log("Adding to waitlist");
    console.log(values);

    const waitlistInfo = {
        name: values.name,
        email_address: values.email,
        gom_experience: values.experience,
        order_frequency: values.orderFrequency,
        average_order_size: values.averageOrderSize,
    }

    const { data, error } = await supabase.from('waitlist').insert(waitlistInfo);

    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    } else {
        console.log("Successfully added to waitlist");
        return { success: true, message: "Successfully added to waitlist", data: data };
    }
}