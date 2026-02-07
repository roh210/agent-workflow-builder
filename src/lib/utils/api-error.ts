import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import {z} from "zod";

export const handleApiError = (error: unknown, operation: string) => {
  console.error(`Error during ${operation}:`, error);

  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Validation Failed", details: error.issues },
      { status: 400 }
    );
  }
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return NextResponse.json(
      { error: "Workflow not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
};
