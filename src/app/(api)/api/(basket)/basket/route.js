import { createBasket, getBasketByEmail, deleteBasket, updateBasket } from "@/lib/data.service";
import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email');


    let subscribers = await getBasketByEmail(email);
    return NextResponse.json(subscribers);

}

export async function POST(request) {
    
    const body = await request.json();

    const newBasket = {
        email : body.email,
        products : body.products
    };

    let basket = await createBasket(newBasket);


    return NextResponse.json({'ok': true, 'message': 'Basket Saved'});


}

// Delete Basket.
export async function DELETE(request) {

    const { searchParams } = new URL(request.url);

    const email = searchParams.get('email');
    const deletedBasket = await deleteBasket(email);

    return NextResponse.json({'ok': true, 'message': `Basket deleted`});

}

// Update Basket.
export async function PUT(request) {


    const body = await request.json();
    let basket = await getBasketByEmail(body.email);

    const newBasket = {
        email : body.email || basket.email,
        products : body.products || basket.products
    };

    // Henter det nuværende review.
   

    // Opdaterer review.
    let result = await updateBasket(newBasket);


    
    return NextResponse.json({'ok': true, 'message': 'Basket updated'});

}
