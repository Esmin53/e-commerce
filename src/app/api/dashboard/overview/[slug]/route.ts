import { orderInfo, orders, products} from "@/db/schema"
import { db } from "@/lib/db"
import { and, eq, sql, sum } from "drizzle-orm"
import {eachMonthOfInterval, format, getMonth} from "date-fns"
import { number } from "zod"
import { SIZES } from "@/config"

export const GET = async  (req: Request) => {
    try {
        const url = new URL(req.url)
        const { pathname } = url

        const productId = pathname.split('/')[4]

        const [{
            paidOrders,
            totalRevenue
        }] = await db.select({
            paidOrders: sql<number>`cast(count(${orderInfo.id}) as int)`,
            totalRevenue: sum(products.price)
        }).from(orders)
        .leftJoin(orderInfo, eq(orderInfo.orderId, orders.id))
        .leftJoin(products, eq(orderInfo.productId, products.id))
        .where(and(
            eq(orders.isPaid, true),
            eq(products.id, productId)
            ))
        
        const [{
            upcomingRevenue,
        }] = await db.select({
            upcomingRevenue: sum(products.price),
        }).from(orders)
        .leftJoin(orderInfo, eq(orderInfo.orderId, orders.id))
        .leftJoin(products, eq(orderInfo.productId, products.id))
        .where(and(
            eq(orders.isPaid, false),
            eq(products.id, productId)
            ))


        const productsData = await db.select({
            createdAt: orderInfo.createdAt,
            color: orderInfo.color,
            size: orderInfo.size,
            price: products.price
        }).from(orderInfo).where(eq(orderInfo.productId, productId)).innerJoin(products, eq(orderInfo.productId, products.id))

        const monthsOfYear = eachMonthOfInterval({ start: new Date(2024, 0, 1), end: new Date(2024, 11, 31) });
        const dataMap: Map<string, { revenue: number }> = new Map(monthsOfYear.map(month => [format(month, 'MMMM'), { revenue: 0 }]));
        let colorsArray = []
        const sizesMap: Map<string, {count: number }> = new Map(SIZES.map(size => [size.value, { count: 0}]))

        for (const item of productsData) {
            const monthName = format(item.createdAt, 'MMMM');
            const existingData = dataMap.get(monthName) || { revenue: 0 };
            colorsArray.push(item.color)
            const existingSizes = sizesMap.get(item.size) || {count: 0}
            if (existingData !== undefined) {
                const currentRevenue = existingData.revenue || 0;
                const existingCount = existingSizes.count ||0
                dataMap.set(monthName, {
                    revenue: currentRevenue + Number(item.price)
                });
                sizesMap.set(item.size, {
                    count: existingCount + 1
                })
            }
        }

        const dataArray = Array.from(dataMap, ([name, { revenue }]) => ({ name, revenue }));
        const sizesArray = Array.from(sizesMap, ([name, {count}]) => ({name, count}))

        return new Response(JSON.stringify({paidOrders, upcomingRevenue, totalRevenue, chartData: dataArray, colorsArray, sizesArray}))

    } catch (error) {
        
    }
}