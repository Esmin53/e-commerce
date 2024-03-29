import { orderInfo, products } from "@/db/schema"
import { db } from "@/lib/db"
import { eq, sql, sum } from "drizzle-orm"
import OrderStatus from "./OrderStatus"

interface OrderProps {
    orderId: string,
    orderStatus: string | null
}

const OrderCard = async ({orderId, orderStatus}: OrderProps) => {

    const [{total, productsCount}] = await db.select({
        total: sum(products.price),
        productsCount: sql<number>`cast(count(${products.id}) as int)`
    })
    .from(orderInfo).where(eq(orderInfo.orderId, orderId)).leftJoin(products, eq(orderInfo.productId, products.id))

    return (
        <div className="w-full flex-col sm:flex-row flex items-center justify-between gap-2 bg-slate-100 shadow border border-slate-100 p-2">
            <div className="flex flex-col gap-1 w-full sm:w-fit">
                <p className="text-xs font-medium">ID: {orderId}</p>
                <div className="flex w-full justify-between items-center px-1">
                    <p className="flex font-medium text-lg">$ {total}</p>
                    <p className="text-sm font-medium">{productsCount} products</p>
                </div>
            </div>
            <OrderStatus orderStatus={orderStatus} orderId={orderId}/>
        </div>
    )
}

export default OrderCard
