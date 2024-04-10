import { orders, users } from "@/db/schema";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {buffer} from "micro"
import getRawBody from "raw-body";

export const config = {
    api: {
        bodyParser: false
    }
}

const webhookHandler = async (req: any, res: any) => {

    if(req.method === "POST") {
    const payload = await req.text()
    const response = await JSON.parse(payload)

    

    const sig = req.headers.get('stripe-signature')

    let event 
    try {
            event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: "Failed", error})
    }

        const session = event.data.object as Stripe.Checkout.Session

        if (!session?.metadata?.userId || !session?.metadata?.orderId) {
            return new Response(JSON.stringify("No metadata"), { status: 400 })
            }
        
        if (event.type === 'checkout.session.completed') {
            const [user] = await db.select().from(users).where(eq(users.id, session.metadata.userId))

            if(!user) {
                return new Response(JSON.stringify("No such user"), { status: 404 } );
            }
    
            const [order] = await db.select().from(orders).where(eq(orders.id, session.metadata.orderId))
    
            if(!order) {
                return new Response(JSON.stringify("No such order"), { status: 404 })
            }
    
                await db.update(orders).set({
                    isPaid: true,
                    orderStatus: "payment_successful"
                }).where(eq(orders.id, session.metadata.orderId))
        }


            return NextResponse.json({ status: 200, event: event.type})
}
}

export { webhookHandler as POST };