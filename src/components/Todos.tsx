import { Props } from "../types/types"
import { Todo } from "./Todo"


export const Todos: React.FC<Props> = ({ todos }) => {
    return (
        <ul>
            {
                todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} todos={todos} />
                        </li>
                    )
                })
            }
        </ul >
    )
}