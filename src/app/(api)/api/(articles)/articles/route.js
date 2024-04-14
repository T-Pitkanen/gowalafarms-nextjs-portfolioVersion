import { getArticles } from "@/lib/data.service";
import { NextResponse } from "next/server"

export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category');

    let articles = [];

    if(category) {
        articles = await getArticles();

        if(category === 'all') {
            articles = await getArticles();
        } else {
            articles = articles.filter(article => article.category === category);
        }
    }


    return NextResponse.json(articles);

}
