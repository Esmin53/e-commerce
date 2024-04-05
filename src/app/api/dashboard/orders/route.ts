import { orderInfo, orders, products } from "@/db/schema"
import authOptions from "@/lib/auth"
import { db } from "@/lib/db"
import { asc, eq, sum } from "drizzle-orm"
import { getServerSession } from "next-auth"

export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session || !session.user.isAdmin === true) {
            return new Response(JSON.stringify("Unauthorized"), { status: 401 })
        }

        const ordersArray = await db.select({
            id: orders.id,
            orderStatus: orders.orderStatus,
            createdAt: orders.createdAt,
            isPaid: orders.isPaid,
        }).from(orders).orderBy(asc(orders.createdAt))
        
        return new Response(JSON.stringify(ordersArray), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Generic server error"), { status: 500 })
    }
    
}