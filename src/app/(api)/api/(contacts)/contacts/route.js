import { createContact, getContacts, deleteContact } from "@/lib/data.service";
import { NextResponse } from "next/server";


export async function GET(request) {

    const { searchParams } = new URL(request.url);
    let services = await getContacts();
   
    return NextResponse.json(services);

}

