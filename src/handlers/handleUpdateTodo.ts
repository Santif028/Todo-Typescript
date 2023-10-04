import { Dispatch, SetStateAction } from "react";
import { ListOfTodos, TodoIdTitle } from "@/types/types";

export const handleUpdateTodo = (todos: ListOfTodos, setTodos: Dispatch<SetStateAction<ListOfTodos>>) => ({ id, title }: TodoIdTitle) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return;

    const updatedTodos = [...todos];
    updatedTodos[todoIndex].title = title;

    setTodos(updatedTodos);
}