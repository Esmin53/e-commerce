import { products } from "@/db/schema"
import authOptions from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { ProductValidator } from "@/lib/validators/product-validator"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import Stripe from "stripe"


export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const { pathname } = url

        const productId = pathname.split('/')[3]

        const [product] = await db.select().from(products).where(eq(products.id, productId))

        return new Response(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("Generic server error"), { status: 500 })
    }
}

export const PUT = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const { pathname } = url

        const productId = pathname.split('/')[3]

        const session = await getServerSession(authOptions);

        if(!session?.user|| session?.user.isAdmin !== true) {
            return new Response(JSON.stringify("Unauthorized"), { status: 401 });
        }

        const body = await req.json()

        let data = ProductValidator.parse(body)

        await db.update(products).set({
            price: data.price.toString(),
            title: data.title,
            collection: data.collection,
            sizes: data.sizes,
            colors: data.colors,
            description: data.description,
            category: data.category,

        }).where(eq(products.id, productId))


        return new Response(JSON.stringify("OK"), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
}