'use server'

import { createAction, getAction, createTodo, removeTodo } from "../../app/actions.js";
import { Button } from "@/components/ui/button.jsx";

export default async function TestPage() {
    const { data } = await createAction();
    await getAction();

    return (
        <div>
            <h1>TestPage</h1>
            <div>{data.map((item, index) => <p key={index}>{item.id}</p>)}</div>

            <Button onClick={createTodo}>Create Todo</Button>
            <Button variant="destructive" onClick={removeTodo}>Remove Todo</Button>


        </div>
    )
}