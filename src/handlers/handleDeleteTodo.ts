import { Dispatch, SetStateAction } from "react";
import { ListOfTodos, TodoId } from "@/types/types";

export const handleDeleteTodo = (todos: ListOfTodos, setTodos: Dispatch<SetStateAction<ListOfTodos>>) => ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
}