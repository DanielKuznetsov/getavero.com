'use server'

import { createAction, getAction, createTodo, removeTodo } from "../app/actions.js";

export default async function TestPage() {
    console.log('TestPage');
    const { data } = await createAction();
    await getAction();

    console.log(data);

    return (
        <div>
            <h1>TestPage</h1>
            <div>{data.map((item, index) => <p key={index}>{item.id}</p>)}</div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={createTodo}>Create Todo</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={removeTodo}>Remove Todo</button>
        </div>
    )
}