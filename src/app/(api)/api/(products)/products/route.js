
import { getProducts, getProductsByRange } from "@/lib/data.service";
import { NextResponse } from "next/server"

// Get Review.
export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range');
    let products = [];


    if(range) {
        products = await getProductsByRange(range);
        return NextResponse.json(products);
    } else {
        products = await getProducts();
    }


  
    
    return NextResponse.json(products);

}

