'use server';

import { revalidatePath } from 'next/cache';
import supabase from '@/utils/supabase/client';

export async function addNewRestaurant(restaurantData) {
    // console.log("Adding new restaurant...");
    // console.log(restaurantData);

    const { data, error } = await supabase.from("restaurants").select("*").eq("business_email_address", restaurantData.email_address);

    // console.log("data one");
    // console.log(data);
    // console.log("error one");
    // console.log(error);

    if (data.length > 0) {
        return { success: false, message: "Restaurant already exists" };
    }

    const { data: restaurant_data, error: restaurant_error } = await supabase.from("restaurants").insert({
        business_name: restaurantData.businessName,
        business_address: restaurantData.businessAddress,
        business_phone_number: restaurantData.phoneNumber,
        business_email_address: restaurantData.email_address,
    });

    if (restaurant_error) {
        return { success: false, message: "Error adding restaurant" };
    } else {
        return { success: true, message: "Restaurant added successfully", restaurant_data: restaurant_data };
    }
}

export async function getRestaurants() {
    const { data, error } = await supabase.from("restaurants").select("*");

    if (error) {
        return { success: false, message: "Error fetching restaurants", error };
    } else {
        return { success: true, message: "Restaurants fetched successfully", restaurants: data };
    }
}

export async function insertDishCategory(dishCategoryData) {
    // IF category name already exists, return error
    const { data: category_data, error: category_error } = await supabase.from("dish_categories").select("*").eq("name", dishCategoryData.categoryName);
    if (category_data.length > 0) {
        return { success: false, message: "Dish category already exists" };
    }


    const { data, error } = await supabase.from("dish_categories").insert({
        name: dishCategoryData.categoryName,
        restaurant_id: dishCategoryData.restaurantId,
    });

    if (error) {
        return { success: false, message: "Error adding dish category" };
    } else {
        return { success: true, message: "Dish category added successfully", dish_category_data: data };
    }
}