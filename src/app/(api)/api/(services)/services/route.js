
import { getServices } from "@/lib/data.service";
import { NextResponse } from "next/server"

// Get Review.
export async function GET(request) {

    const { searchParams } = new URL(request.url);
    let services = await getServices();
   
    return NextResponse.json(services);

}
