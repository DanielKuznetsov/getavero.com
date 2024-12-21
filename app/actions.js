'use server';

import supabase from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache'

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

export async function createTodo() {
    const { data, error } = await supabase.from("todos").insert({
        todo: "Test Todo"
    });

    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    }

    revalidatePath('/');
}

export async function removeTodo() {
    const { data, error } = await supabase.from("todos").delete().eq("id", 5);

    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    }

    revalidatePath('/');
}