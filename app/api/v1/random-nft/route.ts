import { generateSingleNFT } from "@/services/randomNFT";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { image, metadata } = await generateSingleNFT();
        return NextResponse.json({ image, metadata }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}
