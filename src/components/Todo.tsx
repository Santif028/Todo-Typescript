import { type Props } from "../types/types";
import { useState } from "react";
import { useTodos } from "@/context/TodoContext";

export const Todo: React.FC<Props> = ({ id, title, completed }) => {
    const { deleteTodo, updateTodo, completeTodo } = useTodos()

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateTodo({ id: id, title: inputValue });
        setInputValue('');
    }

    return (
        <div className="grid grid-cols-[2rem_minmax(auto,_1fr)_2rem] grid-rows-1 items-center hover:bg-gray-300 border-b-2 border-gray-300">
            <input
                type="checkbox"
                name="completed"
                checked={completed}
                onChange={async (e) => {
                    await completeTodo({ id, completed: e.target.checked })
                }}
                readOnly
                className=" accent-blue-800 checked:bg-blue-500"
            />
            <form onSubmit={handleSubmit}>
                <input name="actualTodo" className={`${completed ? 'line-through text-slate-700 italic' : ''} text-xl bg-transparent`} defaultValue={title} onChange={(e) => {
                    setInputValue(e.target.value)
                }} />
            </form>
            <button onClick={async () => {
                await deleteTodo({ id });

            }
            } className="hover:text-red-700">X</button>
        </div>
    )
}