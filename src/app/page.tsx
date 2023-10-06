'use client'
import { useEffect } from "react"
import { useTodos } from "@/context/TodoContext";
import { Todos } from "@/components/Todos"
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  const { filteredTodos, loadTodos } = useTodos()

  useEffect(() => {
    loadTodos()
  }, [loadTodos]);

  return (
    <main className="h-screen flex flex-col py-6 items-center bg-sky-500">
      <div className="flex flex-col">
        <h1 className="text-6xl"><strong>TODO</strong></h1>
        <p className=" text-s italic self-end">with <a href="https://www.typescriptlang.org" target="_blank" rel="nofollow" className=" underline hover:text-red-800">TypeScript</a></p>
      </div>
      <section className="w-11/12 sm:w-3/5 xl:w-2/5 my-6 bg-white shadow-lg shadow-black">
        <Header
        />
        <Todos
          todos={filteredTodos} title={""} />
        <Footer
        />
      </section>
    </main>
  )
}