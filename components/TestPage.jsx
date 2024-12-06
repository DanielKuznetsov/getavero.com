'use server'

import { createAction, getAction } from "../app/actions.js";

export default async function TestPage() {
    console.log('TestPage');
    // const { data, error } = await createAction();
    await getAction();
    await createAction();
    // console.log(data);
}