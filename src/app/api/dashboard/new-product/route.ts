import { products } from "@/db/schema"
import authOptions from "@/lib/auth"
import { db } from "@/lib/db"
import { ProductValidator } from "@/lib/validators/product-validator"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
  

export const POST = async (req: Request) => {
    try {
        const body = await req.json()

        const session = await getServerSession(authOptions)

        if(!session?.user || session?.user.isAdmin !== true) {
            throw new Error("Unauthorized")
        }

        const {title, price, description, sex, collection, sizes, colors, images, featured, category} = ProductValidator.parse(body);

        if(!sizes?.length || !colors?.length || !images?.length) {
            return new Response(JSON.stringify("BAD REQUEST"), { status: 400})
        }

        const isTitleUnqiue = await db.select().from(products).where(eq(products.title, title))

        if(isTitleUnqiue.length) {
            return new Response(JSON.stringify("CONFLICT"), { status: 409 })
        }

        const newProduct: {createdProductId: string}[] = await db.insert(products).values({
            //@ts-expect-error Throws error on any first field
            title,
            price,
            description,
            sex,
            collection,
            sizes,
            colors,
            images,
            category,
            isFeatured: featured
        }).returning({ createdProductId: products.id })

        return new Response(JSON.stringify({id: newProduct[0]?.createdProductId}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify("Server error"), {status: 500})        
    }
}