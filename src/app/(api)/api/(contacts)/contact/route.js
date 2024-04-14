import { createContact, getContacts, deleteContact } from "@/lib/data.service";
import { NextResponse } from "next/server";

export async function POST(request) {
    
    let body = await request.json();

    let newContact = await createContact(body);
    if(newContact === undefined || newContact.email == '' || newContact.name == '' || newContact.phone == '' || newContact.message == '')
    {
        return NextResponse.json({error: 'Could not create contact, check your inputs'}, {status: 400});
    }

    return NextResponse.json({'ok': true, 'message': `Contact created`, 'contact': newContact});

}

// Get FAQ
export async function DELETE(request) {
    
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const deleted = await deleteContact(id);

    return NextResponse.json({'ok': true, 'message': `Contact deleted : ${deleted._id}`});

}