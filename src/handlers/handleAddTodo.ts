import { Dispatch, SetStateAction } from "react";
import { TodoTitle, ListOfTodos, TodoId } from "@/types/types";

export const handleAddTodo = (todos: ListOfTodos, setTodos: Dispatch<SetStateAction<ListOfTodos>>) => ({ title }: TodoTitle) => {
  const newTodo = {
    id: crypto.randomUUID(),
    title,
    completed: false
  }
  const newTodos = [...todos, newTodo];
  setTodos(newTodos);
};

