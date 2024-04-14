
import { getFAQS } from "@/lib/data.service";
import { NextResponse } from "next/server"

// Get Review.
export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit');

    let promos = await getFAQS();

    if(limit) promos = promos.slice(0, limit);
    
    return NextResponse.json(promos);

}

