import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, ign, rank, rr } = body;

    const player = await prisma.player.create({
      data: {
        name,
        ign,
        rank,
        rr: parseInt(rr, 10),
      },
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
