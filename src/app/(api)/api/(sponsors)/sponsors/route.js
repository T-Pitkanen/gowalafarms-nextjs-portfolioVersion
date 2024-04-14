
import { getSponsors } from "@/lib/data.service";
import { NextResponse } from "next/server"

// Get Review.
export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit');

    let sponsors = await getSponsors();

    if(limit) sponsors = sponsors.slice(0, limit);
    
    return NextResponse.json(sponsors);

}

