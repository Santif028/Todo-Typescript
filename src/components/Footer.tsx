import { Filters } from "./Filters"
import { useTodos } from "@/context/TodoContext"

export const Footer: React.FC = () => {
    const { activeCount, completedCount, deleteCompleted } = useTodos();
    return (
        <footer className="flex justify-between items-center m-2">
            <span>
                <strong>{activeCount}</strong> Left
            </span>

            <Filters
            />

            <button
                onClick={async () => {
                    await deleteCompleted()
                }}
                className={`${completedCount > 0 ? '' : 'invisible'} hover:underline`}
            >
                Clear completed
            </button>
        </footer>
    )
}