'use client'
import { FilterValue, ListOfTodos, Todo, TodoId, TodoIdCompleted, TodoIdTitle } from "@/types/types";
import { TODO_FILTERS } from "@/consts/consts";
import { createContext, useContext, useMemo, useState } from "react";

export const TodoContext = createContext<{
    filteredTodos: ListOfTodos
    filter: FilterValue
    activeCount: number
    completedCount: number
    loadTodos: () => Promise<void>
    createTodo: (todo: Todo) => Promise<void>
    deleteTodo: (id: TodoId) => Promise<void>
    updateTodo: ({ id, title }: TodoIdTitle) => Promise<void>
    completeTodo: ({ id, completed }: TodoIdCompleted) => Promise<void>
    deleteCompleted: () => Promise<void>
    selectFilter: (filter: FilterValue) => void;
}>({
    filteredTodos: [],
    filter: TODO_FILTERS.ALL,
    activeCount: 0,
    completedCount: 0,
    loadTodos: async () => { },
    createTodo: async (todo: Todo) => { },
    deleteTodo: async (id: TodoId) => { },
    updateTodo: async ({ id, title }: TodoIdTitle) => { },
    completeTodo: async ({ id, completed }: TodoIdCompleted) => { },
    deleteCompleted: async () => { },
    selectFilter: (filter: FilterValue) => { }
});

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used within the TodoProvider')
    }
    return context
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<ListOfTodos>([])
    const [filter, setFilter] = useState<FilterValue>(TODO_FILTERS.ALL);

    const filteredTodos = todos.filter(todo => {
        if (filter === TODO_FILTERS.ACTIVE) return !todo.completed
        if (filter === TODO_FILTERS.COMPLETED) return todo.completed
        return todo
    })

    const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);
    const completedCount = useMemo(() => todos.filter(todo => todo.completed).length, [todos]);

    const selectFilter = (filter: FilterValue) => {
        setFilter(filter)
    }

    async function loadTodos() {
        const res = await fetch('api/todos');
        const data = await res.json();
        setTodos(data);
    }

    async function createTodo(todo: Todo) {
        const res = await fetch('api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const newTodo = await res.json();

        const newTodos = [...todos, newTodo]
        setTodos(newTodos)
    }

    async function deleteTodo({ id }: TodoId) {
        await fetch(`api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        setTodos(todos.filter(todo => todo.id !== id))
    }

    async function updateTodo({ id, title }: TodoIdTitle) {
        await fetch(`api/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: title }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    async function completeTodo({ id, completed }: TodoIdCompleted) {
        await fetch(`api/todos/${id}/checked`, {
            method: 'PUT',
            body: JSON.stringify({ completed: completed }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed
                }
            }
            return todo
        })

        setTodos(newTodos)
    }

    async function deleteCompleted() {
        await fetch('api/todos/completed', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const newTodos = todos.filter(todo => !todo.completed);
        setTodos(newTodos);
    }

    return <TodoContext.Provider value={{
        filteredTodos,
        filter,
        loadTodos,
        createTodo,
        deleteTodo,
        updateTodo,
        completeTodo,
        activeCount,
        completedCount,
        selectFilter,
        deleteCompleted,
    }}>
        {children}
    </TodoContext.Provider>
}
