
import { createProduct, getProduct, updateProduct, deleteProduct } from "@/lib/data.service";
import { deleteFile, fileHandler } from "@/lib/files/fileHandler";

import { NextResponse } from "next/server"

// Get Product.
export async function GET(request) {
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    let product = await getProduct(id);
    
    return NextResponse.json(product);

}

// Create new Product.
export async function POST(request) {

    const data = await request.formData();
    const array = new Uint32Array(1);
    const postfix = crypto.getRandomValues(array)[0];

    const file = data.get('file');
    const title = data.get('title');
    const price = data.get('price');
    const exclusive = data.get('exclusive');
    const discountInPercent = data.get('discountInPercent');
    const description = data.get('description');

    const folder = "products";
    const fileName = `product_${postfix}`;

    const newProduct = {
        title: title,
        price: price,
        exclusive: exclusive,
        discountInPercent: discountInPercent,
        description: description
    }
    
    // Hvis der er en fil, så opdaterer vi den.
    if(file && file.name)
    {
        let extension = file ? file.type.split('/')[1] : null;

        //TODO: Add validation for file type
        extension = extension === 'jpeg' ? 'jpg' : extension; 
        newProduct.imagePath =`/${folder}/${fileName}.${extension}`;
        let result = await fileHandler({file, folder, fileName});
    }

    let product = await createProduct(newProduct);

    return NextResponse.json({'ok': true, 'message': 'Product created'});

    
}

// Update Product.
export async function PUT(request) {

    const data = await request.formData();
    const array = new Uint32Array(1);
    const postfix = crypto.getRandomValues(array)[0];

    const file = data.get('file');
    const id = data.get('id');
    const title = data.get('title');
    const price = data.get('price');
    const exclusive = data.get('exclusive');
    const discountInPercent = data.get('discountInPercent');
    const description = data.get('description');
    const folder = "products";

    // Henter det nuværende product.
    let pro = await getProduct(id);

    // Opretter et nyt review objekt.
    const newProduct = {
        _id: pro._id,
        title: title || pro.title,
        price: price || pro.price,
        exclusive: exclusive || pro.exclusive,
        discountInPercent: discountInPercent || pro.discountInPercent,
        description: description || pro.description,
        imagePath: pro.imagePath
    }

    // Hvis der er en fil, så opdaterer vi den.
    if(file && file.name)
    {
        let extension = file ? file.type.split('/')[1] : null;

        //TODO: Add validation for file type
        extension = extension === 'jpeg' ? 'jpg' : extension;
        const fileName = `product_${postfix}`;
        newProduct.imagePath = `/${folder}/${fileName}.${extension}`;

        let deleteImage = await deleteFile(pro.imagePath);
        let result = await fileHandler({file, folder, fileName});
        
    }
    
    // Opdaterer review.
    let updPro = await updateProduct(newProduct);

    return NextResponse.json({'ok': true, 'message': 'Product updated'});

}

// Delete Product.
export async function DELETE(request) {

    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const deletedProduct = await deleteProduct(id);
    let deleteImage = deleteFile(deletedProduct.imagePath);
    
   

    return NextResponse.json({'ok': true, 'message': `Product deleted and image deleted for: ${deletedProduct.title}`});

}