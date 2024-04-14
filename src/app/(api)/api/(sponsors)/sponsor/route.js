import { createSponsor, getSponsor, updateSponsor, deleteSponsor } from "@/lib/data.service";
import { deleteFile, fileHandler } from "@/lib/files/fileHandler";
import { NextResponse } from "next/server";

// Get Sponsor.
export async function GET(request) {
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    let sponsor = await getSponsor(id);
    
    return NextResponse.json(sponsor);

}

// Create new Sponsor.
export async function POST(request) {

    const data = await request.formData();
    const array = new Uint32Array(1);
    const postfix = crypto.getRandomValues(array)[0];

    const file = data.get('file');
    const name = data.get('name');

    const folder = "sponsors";
    const fileName = `sponsor_${postfix}`;

    console.log('file test', file, file.name)
    
    const newSponsor = {
        name: name
    }
    
    // Hvis der er en fil, så opdaterer vi den.
    if(file && file.name !== '')
    {
        let extension = file ? file.type.split('/')[1] : null;

        //TODO: Add validation for file type
        extension = extension === 'jpeg' ? 'jpg' : extension; 
        newSponsor.imagePath = `/${folder}/${fileName}.${extension}`
        let result = await fileHandler({file, folder, fileName});
    }


    let sponsor = await createSponsor(newSponsor);
    

    return NextResponse.json({'ok': true, 'message': 'Sponsor created'});

    
}


// Update Sponsor.
export async function PUT(request) {

    const data = await request.formData();
    const array = new Uint32Array(1);
    const postfix = crypto.getRandomValues(array)[0];

    const id = data.get('id');
    const file = data.get('file');
    const name = data.get('name');
    
    const folder = "sponsors";
    let extension = file ? file.type.split('/')[1] : null;

    extension = extension === 'jpeg' ? 'jpg' : extension;
    const fileName = `sponsor_${postfix}`;

    let pro = await getSponsor(id);

    const newSponsor = {
        _id: pro._id,
        name: name || pro.name,
        imagePath: file && file.name ? `/${folder}/${fileName}.${extension}` : pro.imagePath
    }
    

    // Opdaterer review.
    let updPro = await updateSponsor(newSponsor);

    // Hvis der er en fil, så opdaterer vi den.
    if(file && file.name)
    {

        let deleteImage = await deleteFile(pro.imagePath);
        let result = await fileHandler({file, folder, fileName});
        
    }
    
    return NextResponse.json({'ok': true, 'message': 'Sponsor updated'});

}


// Delete Review.
export async function DELETE(request) {

    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const deleted = await deleteSponsor(id);
    let deleteImage = deleteFile(deleted.imagePath)
    
    return NextResponse.json({'ok': true, 'message': `Sponsor deleted and image deleted for: ${deleted.name}`});

}