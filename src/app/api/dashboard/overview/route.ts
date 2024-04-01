import { orderInfo, orders, products } from "@/db/schema";
import { db } from "@/lib/db";
import { eq, sql, sum } from "drizzle-orm";

export const GET = async () => {
    try {
         
        const [{ totalRevenue,
            paidOrders
             }] = await db.select({
            totalRevenue:  sum(products.price),
            paidOrders: sql<number>`cast(count(${orders.id}) as int)`
        })
        .from(orders).where(eq(orders.isPaid, true))
        .leftJoin(orderInfo, eq(orders.id, orderInfo.orderId))
        .leftJoin(products, eq(orderInfo.productId, products.id))

        const [{ upcomingRevenue,
            unpaidOrders
        }] = await db.select({
       upcomingRevenue:  sum(products.price),
       unpaidOrders: sql<number>`cast(count(${orders.id}) as int)`
            })
        .from(orders).where(eq(orders.isPaid, false))
        .leftJoin(orderInfo, eq(orders.id, orderInfo.orderId))
        .leftJoin(products, eq(orderInfo.productId, products.id))

        const [{ productsCount }] = await db.select({
            productsCount: sql<number>`cast(count(${products.id}) as int)`
        }).from(products)

        

        return new Response(JSON.stringify({ totalRevenue, 
                upcomingRevenue, 
                paidOrders, 
                unpaidOrders, 
                productsCount }), { status: 200})
                
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 200 })
    }
}