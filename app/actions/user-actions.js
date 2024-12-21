'use server';

import { revalidatePath } from 'next/cache';
import supabase from '@/utils/supabase/client';

export async function addTodo(todo) {
    const { data, error } = await supabase
        .from("todos")
        .insert({ todo: todo });

    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Todo added' };
}

export async function removeTodo(todo) {
    const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq("todo", todo);

    if (error) {
        console.error(error);
        return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Todo removed' };
}

export async function getTodos() {
    const { data, error } = await supabase
        .from("todos")
        .select("todo");

    if (error) {
        console.error(error);
        return { success: false, message: error.message, data: [] };
    }

    return { success: true, data: data.map(item => item.todo) };
}

