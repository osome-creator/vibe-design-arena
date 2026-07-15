import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { FinancialReportSchema } from "@/lib/schema";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "lib", "data.json");
    const raw = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    // Validate with Zod
    const result = FinancialReportSchema.safeParse(parsed);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Data validation failed",
          details: result.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load financial data", message: String(err) },
      { status: 500 }
    );
  }
}
