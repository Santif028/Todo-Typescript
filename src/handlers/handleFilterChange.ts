import { Dispatch, SetStateAction } from "react";
import { FilterValue } from "@/types/types"

export const handleTodoFilterChange = (setFilter: Dispatch<SetStateAction<FilterValue>>) => (filter: FilterValue) => {
    setFilter(filter)
}