import { TodoTitle } from "@/types/types"
import { CreateTodo } from "./CreateTodo"

interface Props {
    onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
    return (
        <header>
            <CreateTodo saveTodo={onAddTodo} />
        </header>
    )
}