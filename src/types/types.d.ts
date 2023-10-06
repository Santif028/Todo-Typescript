import { TODO_FILTERS } from "@/consts/consts"

export interface Todo {
    id?: number,
    title: string,
    completed?: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>
export type TodoIdCompleted = Pick<Todo, 'id' | 'completed'>
export type TodoIdTitle = Pick<Todo,'id' | 'title'>

type ListOfTodos = Todo[]

export interface Props extends Todo {
    todos : ListOfTodos
}

export interface Params {
    params: {id: TodoId}
}

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
