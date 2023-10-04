import { FilterValue } from "@/types/types"
import { Filters } from "./Filters"

interface Props {
    filterSelected: FilterValue
    activeCount: number,
    completedCount: number,
    handleFilterChange: (filter: FilterValue) => void
    onClearCompleted: () => void
}

export const Footer: React.FC<Props> = ({
    filterSelected,
    activeCount = 0,
    completedCount = 0,
    handleFilterChange,
    onClearCompleted
}) => {
    return (
        <footer className="flex justify-between items-center m-2">
            <span>
                <strong>{activeCount}</strong> Left
            </span>

            <Filters
                filterSelected={filterSelected}
                handleFilterChange={handleFilterChange}
            />

            <button
                onClick={onClearCompleted}
                className={`${completedCount > 0 ? '' : 'invisible'} hover:underline`}
            >
                Clear completed
            </button>
        </footer>
    )
}