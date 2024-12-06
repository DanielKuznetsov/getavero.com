'use server';

import supabase from '@/utils/supabase/client';

export async function createAction() {
    console.log('Creating action...');

    const { data, error } = await supabase.from("todos").select("*");

    console.log(data);
    console.log(error);
}

export async function getAction() {
    console.log('Getting action...');
}