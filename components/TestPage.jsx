'use server'

import { createAction, getAction } from "../app/actions.js";

export default async function TestPage() {
    console.log('TestPage');
    const { data, error } = await createAction();
    await getAction();

    console.log(data);

    return (
        <div>
            <h1>TestPage</h1>
            <div>{data.map((item, index) => <p key={index}>{item.id}</p>)}</div>
        </div>
    )
}