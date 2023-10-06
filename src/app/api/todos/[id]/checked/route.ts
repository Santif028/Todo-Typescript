import { NextResponse } from "next/server";
import { Params } from "@/types/types";
import { prisma } from "@/libs/prisma";

export async function PUT(request: Request, { params }: Params) {
    try {

        const { completed } = await request.json()

        const updatedTodo = await prisma.note.update({
            where: {
                id: Number(params.id)
            },
            data: {
                completed,
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
