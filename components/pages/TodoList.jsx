'use client';

import { useState, useEffect } from 'react';
import { addTodo, removeTodo, getTodos } from '@/app/actions/user-actions';

export default function SimpleTodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        const result = await getTodos();
        if (result.success) {
            setTodos(result.data);
        } else {
            console.error(result.message);
        }
    }

    async function handleAddTodo() {
        const newTodo = `Todo ${todos.length + 1}`;
        const result = await addTodo(newTodo);
        if (result.success) {
            setTodos([...todos, newTodo]);
        } else {
            console.error(result.message);
        }
    }

    async function handleRemoveTodo(todo) {
        const result = await removeTodo(todo);
        if (result.success) {
            setTodos(todos.filter(t => t !== todo));
        } else {
            console.error(result.message);
        }
    }

    return (
        <div>
            <button onClick={handleAddTodo}>Add Hardcoded Todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => handleRemoveTodo(todo)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

