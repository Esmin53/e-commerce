import { products } from "@/db/schema"
import { db } from "@/lib/db"
import { TCategory, TCollection, TColor, TSex, TSize } from "@/types/enmus"
import { and, arrayContains, asc, desc, eq } from "drizzle-orm"

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url)

        let sex: TSex | undefined = searchParams.get("sex") as TSex || undefined
        let category: TCategory | undefined = searchParams.get("category") as TCategory || undefined
        let color: TColor | undefined = searchParams.get("color") as TColor || undefined
        let size: TSize | undefined = searchParams.get("size") as TSize || undefined
        let collection: TCollection | undefined = searchParams.get("collection") as TCollection || undefined
        const orderByParam = searchParams.get("orderBy") || "alphabetical-asc"

        let ascOrDesc = orderByParam.split('-')[1]
        let priceOrTitle = orderByParam.split('-')[0]

        const data = await db.select().from(products).where(and(
            sex && eq(products.sex, sex),
            color && arrayContains(products.colors, [color]),
            size && arrayContains(products.sizes, [size]),
            category && eq(products.category, category),
            collection && eq(products.collection, collection)
        )).orderBy(ascOrDesc === 'asc' ?
             asc(priceOrTitle === 'price' ? products.price : products.title) : 
             desc(priceOrTitle === 'price' ? products.price : products.title)
             )
        

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Generic server error"), { status: 500 })
    }
}