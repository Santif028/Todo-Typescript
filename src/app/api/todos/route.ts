import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
    try {
        const todos = await prisma.note.findMany()

        return NextResponse.json(todos)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 500 })
        }
    }
}

export async function POST(request: Request) {
    try {
        const { title } = await request.json()

        const newNote = await prisma.note.create({
            data: {
                title,
            }
        })

        return NextResponse.json(newNote)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 500 })
        }
    }
}

export function DELETE() {
    return NextResponse.json({ message: "borrando all todos" })
}