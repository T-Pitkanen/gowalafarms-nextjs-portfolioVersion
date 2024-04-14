
import { createFAQ, deleteFAQ, getFAQ, updateFAQ } from "@/lib/data.service";
import { NextResponse } from "next/server"

// Get FAQ
export async function GET(request) {
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    let faq = await getFAQ(id);
    
    return NextResponse.json(faq);

}

// Add FAQ
export async function POST(request) {
    
    let body = await request.json();

    let newFAQ = {
        question: body.question,
        answer: body.answer
    }

    let faq = await createFAQ(newFAQ);
    
    return NextResponse.json(faq);

}

// Update FAQ
export async function PUT(request) {
    
    let body = await request.json();
    let oldFaq = await getFAQ(body.id);

    let newFAQ = {
        id: body.id,
        question: body.question || oldFaq.question,
        answer: body.answer || oldFaq.answer
    }

    let faq = await updateFAQ(newFAQ);
    
    return NextResponse.json(faq);

}

// Get FAQ
export async function DELETE(request) {
    
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const deletedFAQ = await deleteFAQ(id);

    return NextResponse.json({'ok': true, 'message': `FAQ deleted : ${deletedFAQ._id}`});

}