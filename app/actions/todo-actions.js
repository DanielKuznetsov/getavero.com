'use server';

import supabase from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache';


export async function createAction() {
    console.log('Creating action...');

    const { data, error } = await supabase.from("todos").select("*");

    if (error) {
        return { success: false, message: error.message };
    }

    // Ensure we're only returning serializable data
    return {
        success: true,
        data: data.map(item => ({ id: item.id, todo: item.todo }))
    };
}

export async function getAction() {
    console.log('Getting action...');
    return { message: 'Action retrieved' };
}

export async function createTodo(formData) {
    const todo = formData.get('todo');

    const { data, error } = await supabase.from("todos").insert({
        todo: todo
    });

    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Todo created' };
}

export async function removeTodo(formData) {
    const id = formData.get('id');

    const { data, error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Todo removed' };
}

