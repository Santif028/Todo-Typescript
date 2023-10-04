import { FILTERS_BUTTONS } from "@/consts/consts"
import { type FilterValue } from "@/types/types"

interface Props {
    filterSelected: FilterValue
    handleFilterChange: (filters: FilterValue) => void
}

export const Filters: React.FC<Props> = ({ handleFilterChange, filterSelected }) => {
    return (
        <ul className="flex gap-1">
            {
                Object.entries(FILTERS_BUTTONS).map(([key, { href, lit }]) => {
                    const isSelected = key === filterSelected

                    return (
                        <li key={key} className={`${isSelected ? 'bg-yellow-300' : ''} rounded border-black border px-1`}>
                            <a
                                href={href}
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleFilterChange(key as FilterValue);
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