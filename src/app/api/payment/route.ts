import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export const POST =async (req: Request) => {
    try {

        const body = await req.json();

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
            price: "price_1Oz5ICC20DnIX2v2d58IKY15",
            quantity: 1,
            adjustable_quantity: {
                enabled: false
            }
        }] 

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
            payment_method_types: ["card"],
            mode: "payment",
            metadata: {
                userId: "Test",
                orderId: "testOrderId"
            },
            line_items
        })

        return new Response(JSON.stringify({ url: stripeSession.url }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 200 })
    }
}