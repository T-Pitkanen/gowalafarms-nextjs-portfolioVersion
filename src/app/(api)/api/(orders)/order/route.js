import { deleteOrderById, getOrderById, postOrder, getOrderByEmail, putOrder } from "@/lib/data.service";
import { NextResponse } from "next/server"

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if(id) {
        
        let order = await getOrderById(id);
        if(order.length !== 0)
        {
            return NextResponse.json(order[0]);
            
        } else {
            return NextResponse.json({'message' : 'der findes ingen ordre med denn email'});
        }
    };

    if(email) {
        let order = await getOrderByEmail(email);

        if(order.length !== 0)
        {
            return NextResponse.json(order[0]);

        } else {
            return NextResponse.json({'message' : 'der findes ingen ordre med denn email'});
        }

        
    };

    return NextResponse.json({});
}

export async function POST(request) {

    const body = await request.json();

    let result = await postOrder(body);

    if(result)
    {
        return NextResponse.json({'ok': true, 'message' : 'Ordre er oprettet', data: {}});
        
    } else {

        return NextResponse.json({'ok': false, 'message' : 'Det opstod en fejl', data: {}});

    }

}

export async function DELETE(request) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if(id) {
        let result = await deleteOrderById(id);

        if(result)
        {
            return NextResponse.json({'ok': true, 'message' : 'Ordre er slettet', data: {}});
            
        } else {
    
            return NextResponse.json({'ok': false, 'message' : 'Det opstod en fejl', data: {}});
    
        }
    };



   return NextResponse.json({});


}

export async function PUT(request) {

    const body = await request.json();
    
    let result = await putOrder(body);
    
    if(result)
    {
        return NextResponse.json({'ok': true, 'message' : 'Ordre er opdateret', data: {}});
        
    } else {

        return NextResponse.json({'ok': false, 'message' : 'Det opstod en fejl', data: {}});

    }

}