import { useState } from "react"
import { useTodos } from "@/context/TodoContext";


export const CreateTodo: React.FC = () => {
    const { createTodo } = useTodos();

    const [inputValue, setInputValue] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createTodo({title: inputValue});
        setInputValue('');
    }

    return (
        <form onSubmit={handleSubmit} className="border-b-2 border-gray-300 flex">
            <input name="createTodo" type="text" value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)
            }} placeholder="What do you want to do?" autoFocus required className="m-2 text-xl w-full" />
        </form>
    )
}