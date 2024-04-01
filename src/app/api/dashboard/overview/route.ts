import { orderInfo, orders, products } from "@/db/schema";
import { db } from "@/lib/db";
import { eachMonthOfInterval, format } from "date-fns";
import { eq, sql, sum } from "drizzle-orm";

export const GET = async () => {
    try {
         
        const [{ totalRevenue,
            paidOrders
             }] = await db.select({
            totalRevenue:  sum(products.price),
            paidOrders: sql<number>`cast(count(${orders.id}) as int)`,
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

        const productsData = await db.select({
            createdAt: orderInfo.createdAt,
            price: products.price
        }).from(orderInfo).innerJoin(products, eq(orderInfo.productId, products.id))

        const monthsOfYear = eachMonthOfInterval({ start: new Date(2024, 0, 1), end: new Date(2024, 11, 31) });
        const dataMap: Map<string, { revenue: number }> = new Map(monthsOfYear.map(month => [format(month, 'MMMM'), { revenue: 0 }]));

        for (const item of productsData) {
            const monthName = format(item.createdAt, 'MMMM');
            const existingData = dataMap.get(monthName) || { revenue: 0 };

            if (existingData !== undefined) {
                const currentRevenue = existingData.revenue || 0;
                dataMap.set(monthName, {
                    revenue: currentRevenue + Number(item.price)
                });
            }
        }

        const dataArray = Array.from(dataMap, ([name, { revenue }]) => ({ name, revenue }));

        return new Response(JSON.stringify({ totalRevenue, 
                upcomingRevenue, 
                paidOrders, 
                unpaidOrders,
                dataArray, 
                productsCount }), { status: 200})
                
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 200 })
    }
}