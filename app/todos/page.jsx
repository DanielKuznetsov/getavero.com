import TodoList from '@/components/pages/TodoList.jsx';
import supabase from '@/utils/supabase/client';

export default async function Page() {
    const { data: todos, error } = await supabase
        .from("todos")
        .select("todo");

    if (error) {
        console.error(error);
        return <div>Error loading todos</div>;
    }

    const todoTexts = todos.map(todo => todo.todo);

    return (
        <main>
            <h1>Simple Todo List</h1>
            <TodoList initialTodos={todoTexts} />
        </main>
    );
}

