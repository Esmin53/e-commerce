import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


export const POST = async (req: NextRequest, res: NextResponse) => {

    const payload = await req.text()
    const response = await JSON.parse(payload)

    const sig = req.headers.get("Stripe-Signature")

    const dateTime = new Date(response?.created * 1000).toLocaleDateString()
    const timeString = new Date(response?.created * 1000).toLocaleDateString()



    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

        console.log("Event: ", event.type)

        const session = event.data.object as Stripe.Checkout.Session

        console.log("Session: ", session)
        console.log("Metadata: ", session.metadata)

        if (!session?.metadata?.userId || !session?.metadata?.orderId) {
            return new Response(JSON.stringify("No metadata"), { status: 400 })
            }

            return NextResponse.json({ status: 200, event: event.type})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: "Failed", error})
    }
}