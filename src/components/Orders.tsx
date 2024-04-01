import { orderInfo, orders, products } from "@/db/schema"
import { db } from "@/lib/db"
import { eq, sum } from "drizzle-orm"
import OrderCard from "./Order"

const Orders = async () => {

    const ordersArray = await db.select().from(orders)

    return (
        <div className="w-full bg-white p-2 shadow border border-slate-200 rounded-sm gap-2 flex flex-col">
            <div className="flex justify-between border-b border-slate-200 pb-1 flex-col">
                <h1 className="text-lg font-medium">Orders</h1>
                <p className="text-muted-foreground font-medium text-sm">You made {ordersArray.length} sales</p>
            </div>
            <div className="w-full flex flex-col gap-2">
                {ordersArray.map((item) => (
                    <OrderCard orderId={item.id} key={item.id} orderStatus={item.orderStatus}/>
                ))}
            </div>
        </div>
    )
}

export default Orders