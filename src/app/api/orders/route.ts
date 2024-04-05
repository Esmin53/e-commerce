import { orders } from "@/db/schema";
import authOptions from "@/lib/auth"
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth"


export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return new Response(JSON.stringify("Unauthorized"), { status: 401 })
        }

        const userOrders = await db.select({
            id: orders.id,
            orderStatus: orders.orderStatus,
            createdAt: orders.createdAt,
            isPaid: orders.isPaid
        }).from(orders).where(eq(orders.userId, session.user.id))

        return new Response(JSON.stringify({userOrders}), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("Generic Server Error"), { status: 500 })
    }
}