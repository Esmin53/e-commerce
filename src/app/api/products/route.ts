import { products } from "@/db/schema"
import { db } from "@/lib/db"
import { TCategory, TCollection, TColor, TSex, TSize } from "@/types/enmus"
import { and, arrayContains, asc, desc, eq, sql } from "drizzle-orm"

export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url)

        let sex: TSex | undefined = searchParams.get("sex") as TSex || undefined
        let category: TCategory | undefined = searchParams.get("category") as TCategory || undefined
        let color: TColor | undefined = searchParams.get("color") as TColor || undefined
        let size: TSize | undefined = searchParams.get("size") as TSize || undefined
        let collection: TCollection | undefined = searchParams.get("collection") as TCollection || undefined
        const orderByParam = searchParams.get("orderBy") || "alphabetical-asc"
        const page: number = Number(searchParams.get("page")) || 1 

        let ascOrDesc = orderByParam.split('-')[1]
        let priceOrTitle = orderByParam.split('-')[0]

        const data = await db.select({
            record: {id: products.id,
            title: products.title,
            price: products.price,
            images: products.images,
            colors: products.colors,
            sizes: products.sizes },
            totalResults: sql<number>`count(*) over()`

        }).from(products).where(and(
            sex && eq(products.sex, sex),
            color && arrayContains(products.colors, [color]),
            size && arrayContains(products.sizes, [size]),
            category && eq(products.category, category),
            collection && eq(products.collection, collection)
        )).orderBy(ascOrDesc === 'asc' ?
             asc(priceOrTitle === 'price' ? products.price : products.title) : 
             desc(priceOrTitle === 'price' ? products.price : products.title)
             ).groupBy(products.id).limit(12).offset(page - 1)
        
        
        const separatedResults = {
            records: data.map((item) => item.record),
            totalResults: data[0].totalResults
        }

        return new Response(JSON.stringify(separatedResults), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Generic server error"), { status: 500 })
    }
}