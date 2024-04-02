import { products } from "@/db/schema";
import authOptions from "@/lib/auth"
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user.isAdmin === true) {
            return new Response(JSON.stringify("Unauthorized"), { status: 401 })
        }

        const { newPrice, id } = await req.json()

        const [{ title }] = await db.select({
            title: products.title,
            priceId: products.price_id,
            stripeId: products.stripe_id
        }).from(products).where(eq(products.id, id))

        const createdProduct = await stripe.products.create({
            name: title,
            default_price_data: {
                currency: "USD",
                unit_amount: Math.round(newPrice * 100)
            }
        })

        await db.update(products).set({
            price: newPrice,
            stripe_id: createdProduct.id,
            price_id: createdProduct.default_price as string
        }).where(eq(products.id, id))

        return new Response(JSON.stringify(JSON.stringify("OK")), { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify("Generic Server Error"), { status: 401 })
    }
}