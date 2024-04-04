import { orderInfo, orders } from "@/db/schema";
import { CartItem } from "@/hooks/use-cart";
import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type Stripe from "stripe";

export const POST =async (req: Request) => {
    try {

        const session = await getServerSession(authOptions)

        if(!session || !session.user) {
            return new Response(JSON.stringify("UNATHORIZED"), { status: 401 })
        }

        const body = await req.json();

        const [{orderId}] = await db.insert(orders).values({
            userId: session.user.id
        }).returning({orderId: orders.id})

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [] 

        if(!orderId) {
            throw new Error()
        }

        body.forEach(async ({product}: CartItem) => {
            line_items.push({
                price: product.priceId,
                quantity: 1
            })

            await db.insert(orderInfo).values({
                //@ts-ignore
                orderId: orderId,
                productId: product.id,
                color: product.color,
                size: product.size
            })
        })

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${orderId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
            payment_method_types: ["card"],
            mode: "payment",
            metadata: {
                userId: session.user.id,
                orderId: orderId
            },
            line_items
        })

        return new Response(JSON.stringify({ url: stripeSession.url }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 200 })
    }
}