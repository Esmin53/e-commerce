import { orders } from "@/db/schema"
import authOptions from "@/lib/auth"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export const PUT = async (req: Request) => {
    try {
        const url = new URL(req.url)
        const { pathname } = url

        const orderId = pathname.split('/')[4]

        const session = await getServerSession(authOptions)

        if(!session || session.user.isAdmin !== true) {
            return new Response(JSON.stringify("UNAUTHORIZED"), { status: 401 })
        }

        const { value } = await req.json()

        await db.update(orders).set({
            orderStatus: value
        }).where(eq(orders.id, orderId))

        return new Response(JSON.stringify("OK"), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("Not Ok"), { status: 500 })
    }
}