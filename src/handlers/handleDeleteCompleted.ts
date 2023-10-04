import { Dispatch, SetStateAction } from "react";
import { ListOfTodos } from "@/types/types";

export const handleDeleteCompletedTodos = (todos: ListOfTodos, setTodos: Dispatch<SetStateAction<ListOfTodos>>) => ()=> {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
}