import { products } from "@/db/schema"
import authOptions from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
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

        const createdProduct = await stripe.products.create({
            name: title,
            default_price_data: {
                currency: "USD",
                unit_amount: Math.round(price * 100)
            }
        })

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
            isFeatured: featured,
            stripe_id: createdProduct.id,
            price_id: createdProduct.default_price
        }).returning({ createdProductId: products.id })

        return new Response(JSON.stringify({id: newProduct[0]?.createdProductId}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify("Server error"), {status: 500})        
    }
}