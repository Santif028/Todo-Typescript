'use client'
import { useState, useEffect, useMemo } from "react"
import { Todos } from "@/components/Todos"
import { FilterValue, ListOfTodos } from "@/types/types";
import { Footer } from "@/components/Footer";
import { TODO_FILTERS } from "@/consts/consts";
import { Header } from "@/components/Header";
import { handleAddTodo } from "@/handlers/handleAddTodo";
import { handleDeleteTodo } from "@/handlers/handleDeleteTodo";
import { handleDeleteCompletedTodos } from "@/handlers/handleDeleteCompleted";
import { handleCompletedTodos } from "@/handlers/handleCompletedTodos";
import { handleTodoFilterChange } from "@/handlers/handleFilterChange";
import { handleUpdateTodo } from "@/handlers/handleUpdateTodo";

const mockTodos: ListOfTodos = []

export default function Home() {
  const [todos, setTodos] = useState<ListOfTodos>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : mockTodos
  });
  const [filter, setFilter] = useState<FilterValue>(TODO_FILTERS.ALL);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = handleAddTodo(todos, setTodos)

  const handleRemove = handleDeleteTodo(todos, setTodos)

  const handleRemoveAllCompletedTodos = handleDeleteCompletedTodos(todos, setTodos)

  const handleCompleted = handleCompletedTodos(todos, setTodos)

  const handleFilterChange = handleTodoFilterChange(setFilter)

  const handleUpdate = handleUpdateTodo(todos, setTodos)

  const filteredTodos = todos.filter(todo => {
    if (filter === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filter === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);
  const completedCount = useMemo(() => todos.filter(todo => todo.completed).length, [todos]);

  return (
    <main className="h-screen flex flex-col py-6 items-center bg-sky-500">
      <div className="flex flex-col">
        <h1 className="text-6xl"><strong>TODO</strong></h1>
        <p className=" text-s italic self-end">with <a href="https://www.typescriptlang.org" target="_blank" rel="nofollow" className=" underline hover:text-red-800">TypeScript</a></p>
      </div>
      <section className="w-11/12 sm:w-3/5 xl:w-2/5 my-6 bg-white shadow-lg shadow-black">
        <Header
          onAddTodo={handleNewTodo}
        />
        <Todos
          todos={filteredTodos}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
          handleCompleted={handleCompleted} id={""} title={""} completed={false}        />
        <Footer
          filterSelected={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          handleFilterChange={handleFilterChange}
          onClearCompleted={handleRemoveAllCompletedTodos}
        />
      </section>
    </main>
  )
}