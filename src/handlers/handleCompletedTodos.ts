import { Dispatch, SetStateAction } from "react";
import { TodoIdCompleted, ListOfTodos } from "@/types/types"

export const handleCompletedTodos = (todos: ListOfTodos, setTodos: Dispatch<SetStateAction<ListOfTodos>>) => ({ id, completed }: TodoIdCompleted) => {
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