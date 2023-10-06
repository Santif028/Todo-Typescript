import { FILTERS_BUTTONS } from "@/consts/consts"
import { useTodos } from "@/context/TodoContext"
import { type FilterValue } from "@/types/types"

export const Filters: React.FC = () => {
    const { filter, selectFilter } = useTodos()

    return (
        <ul className="flex gap-1">
            {
                Object.entries(FILTERS_BUTTONS).map(([key, { href, lit }]) => {
                    const isSelected = key === filter

                    return (
                        <li key={key} className={`${isSelected ? 'bg-yellow-300' : ''} rounded border-black border px-1`}>
                            <a
                                href={href}
                                onClick={(event) => {
                                    event.preventDefault();
                                    selectFilter(key as FilterValue);
                                }}
                            >
                                {lit}
                            </a>
                        </li>
                    )
                })
            }


        </ul>
    )
}