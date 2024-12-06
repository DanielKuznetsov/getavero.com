'use server';

import supabase from '@/utils/supabase/client';

export async function createAction() {
    console.log('Creating action...');

    const { data, error } = await supabase.from("todos").select("*");

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true, data };
}

export async function getAction() {
    console.log('Getting action...');
}