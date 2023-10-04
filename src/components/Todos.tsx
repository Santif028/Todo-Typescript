import { type Props } from "../types/types"
import { Todo } from "./Todo"


export const Todos: React.FC<Props> = ({ todos, handleRemove, handleCompleted, handleUpdate }) => {
    return (
        <ul>
            {
                todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} handleRemove={handleRemove} handleCompleted={handleCompleted} handleUpdate={handleUpdate} todos={todos}/>
                        </li>
                    )
                })
            }
        </ul >
    )
}