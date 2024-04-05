import { orderInfo, products } from "@/db/schema"
import { db } from "@/lib/db"
import { eq, sql, sum } from "drizzle-orm"
import OrderStatus from "./OrderStatus"

interface OrderProps {
    orderId: string ,
    orderStatus: string
}

const OrderCard = ({orderId, orderStatus}: OrderProps) => {



    return (
        <div className="w-full flex-col sm:flex-row flex items-center justify-between gap-2 border-b border-slate-200 p-2">
            <div className="flex flex-col gap-1 w-full sm:w-fit">
                <p className="text-xs font-medium">ID: {orderId}</p>
            </div>
            <OrderStatus orderStatus={orderStatus} orderId={orderId}/>
        </div>
    )
}

export default OrderCard
