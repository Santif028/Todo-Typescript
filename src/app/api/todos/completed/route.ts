import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(request: Request) {
    try {
        const removedTodo = await prisma.note.deleteMany({
            where: {
                completed: true
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