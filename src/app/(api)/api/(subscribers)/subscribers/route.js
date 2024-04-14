
import { getSubscribers } from "@/lib/data.service";
import { NextResponse } from "next/server"
export const revalidate = 0;
// Get Promo.
export async function GET() {

    let promos = await getSubscribers();
    
    return NextResponse.json(promos);

}

