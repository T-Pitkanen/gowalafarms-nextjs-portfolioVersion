
import { getEmployees } from "@/lib/data.service";
import { NextResponse } from "next/server"

// Get Review.
export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit');

    let teams = await getEmployees();

    if(limit) teams = teams.slice(0, limit);
    
    return NextResponse.json(teams);

}

