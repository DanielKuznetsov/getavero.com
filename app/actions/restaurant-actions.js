'use server';

import supabase from '@/utils/supabase/client';
import { menuItems } from '@/utils/menu/menu';

export async function addNewRestaurant(restaurantData) {
    const { data, error } = await supabase.from("restaurants").select("*").eq("business_email_address", restaurantData.email_address);

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

export async function getDishCategories(restaurantId) {
    const { data, error } = await supabase.from("dish_categories").select("*").eq("restaurant_id", restaurantId);

    if (error) {
        return { success: false, message: "Error fetching dish categories" };
    } else {
        return { success: true, message: "Dish categories fetched successfully", dish_categories: data };
    }
}

export async function getMenuItems(restaurantId) {
    const { data, error } = await supabase.from("menu_items").select("*").eq("restaurant_id", restaurantId);
    
    if (error) {
        return { success: false, message: "Error fetching menu items" };
    } else {
        return { success: true, message: "Menu items fetched successfully", menu_items: data };
    }
}

// For right now, the restaurant name will be hardcoded to "Enzo's Pizzeria"
export async function getMenuItemsAndCategories(restaurantId) {
    const { data, error } = await supabase.from("menu_items").select("*").eq("restaurant_id", restaurantId);
    const { data: dish_categories, error: categories_error } = await supabase.from("dish_categories").select("*").eq("restaurant_id", restaurantId);

    if (error || categories_error) {
        return { success: false, message: "Error fetching menu items" };
    } else {
        return { success: true, message: "Menu items fetched successfully", menu_items: data, dish_categories: dish_categories };
    }
}

export async function insertMenuItems(restaurantId) {
    const RESTAURANT_ID = restaurantId;
    // const RESTAURANT_ID = "256075a0-74b1-41eb-be8c-c89d0808774e";
    let duplicates = [];
    let inserted = 0;

    try {
        // Process each category
        for (const [categoryName, items] of Object.entries(menuItems)) {
            // Check if category exists
            const { data: existingCategory } = await supabase
                .from('dish_categories')
                .select('id')
                .eq('restaurant_id', RESTAURANT_ID)
                .eq('name', categoryName)
                .single();

            // Get category ID - create if doesn't exist
            let categoryId;
            if (!existingCategory) {
                const { data: newCategory, error: categoryError } = await supabase
                    .from('dish_categories')
                    .insert({
                        name: categoryName,
                        restaurant_id: RESTAURANT_ID
                    })
                    .select()
                    .single();

                if (categoryError) throw categoryError;
                categoryId = newCategory.id;
            } else {
                categoryId = existingCategory.id;
            }

            // Insert menu items for this category
            for (const item of items) {
                // Check if the item already exists
                const { data: existingItem } = await supabase
                    .from('menu_items')
                    .select('id')
                    .eq('restaurant_id', RESTAURANT_ID)
                    .eq('name', item.name)
                    .single()

                if (existingItem) {
                    duplicates.push(item.name);
                    continue; // Skip this item and continue with the next
                }

                const menuItem = {
                    name: item.name,
                    restaurant_id: RESTAURANT_ID,
                    dish_category_id: categoryId,
                    choose_option: item.choose_option || null,
                    choose_topping: item.choose_topping || null,
                    add_toppings: item.add_toppings || null,
                    choose_salad: item.choose_salad || null,
                    choose_pasta: item.choose_pasta || null,
                    add_extra: item.add_extra || null,
                    remove_toppings: item.remove_toppings || null,
                    general_pizza_mod: item.general_pizza_mod || null,
                    salad_toppings_mod: item.salad_toppings_mod || null,
                    choose_soda: item.choose_soda || null
                };

                const { error: insertError } = await supabase
                    .from('menu_items')
                    .insert(menuItem);

                if (insertError) {
                    console.error(`Error inserting menu item ${item.name}:`, insertError);
                    throw insertError;
                }

                inserted++;
            }
        }

        let message = `${inserted} menu items inserted successfully.`;
        if (duplicates.length > 0) {
            message += ` ${duplicates.length} duplicate items were skipped.`;
            // message += ` ${duplicates.length} duplicate items were skipped: ${duplicates.join(', ')}.`;
        }

        return {
            success: false,
            message: message
        };

    } catch (error) {
        console.error("Error inserting menu items:", error);
        return {
            success: false,
            message: "Failed to insert menu items",
            error: error.message
        };
    }
}