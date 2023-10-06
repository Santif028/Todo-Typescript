import { Params } from "@/types/types";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request, { params }: Params) {
    try {
        const todo = await prisma.note.findFirst({
            where: {
                id: Number(params.id)
            }
        })
        if (!todo) return NextResponse.json({ messaage: "Todo not found" }, { status: 404 });

        return NextResponse.json(todo)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 500 })
        }
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const removedTodo = await prisma.note.delete({
            where: {
                id: Number(params.id)
            }
        })
        if (!removedTodo) return NextResponse.json({ messaage: "Todo not found" }, { status: 404 });

        return NextResponse.json(removedTodo)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ messaage: "Todo not found" }, { status: 404 })
            }
            return NextResponse.json({ message: error.message, status: 500 })
        }
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { title } = await request.json()

        const updatedTodo = await prisma.note.update({
            where: {
                id: Number(params.id)
            },
            data: {
                title
            }
        })
        if (!updatedTodo) return NextResponse.json({ messaage: "Todo not found" }, { status: 404 });

        return NextResponse.json(updatedTodo)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 500 })
        }
    }
}
