import { orders } from "@/db/schema";
import { CartItem } from "@/hooks/use-cart";
import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

export const POST =async (req: Request, {params}: {params: {slug: string}}) => {
    try {

        const session = await getServerSession(authOptions)

        const { slug } = params

        const body = await req.json()

        if(!session || !session.user) {
            return new Response(JSON.stringify("UNATHORIZED"), { status: 401 })
        }

        const [{orderId}] = await db.select({
            orderId: orders.id,
            orderStatus: orders.orderStatus,
            isPaid: orders.isPaid
        }).from(orders).where(eq(orders.id, slug))

        if(!orderId) {
            throw new Error()
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${orderId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
            payment_method_types: ["card"],
            mode: "payment",
            metadata: {
                userId: session.user.id,
                orderId: orderId
            },
            line_items: body
        })

        return new Response(JSON.stringify({ url: stripeSession.url }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 200 })
    }
}