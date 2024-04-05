"use client"

import { orders as ordersType} from "@/db/schema"
import { useEffect, useState } from "react"
import OrderCard from "./Order"
import { Loader2 } from "lucide-react"

const Orders = () => {
    const [orders, setOrders] = useState< typeof ordersType.$inferInsert[]>([])

    const getOrders = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/orders`)

            const data: typeof ordersType.$inferInsert[] = await response.json()
    
            setOrders(data)

            console.log(data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    if(!orders || !orders.length) {
        return <div className="w-full flex items-center justify-center">
            <Loader2 className="animate-spin" />
        </div>
    }

    return (
        <div className="w-full bg-white p-2 shadow border border-slate-200 rounded-sm gap-2 flex flex-col">
            <div className="flex justify-between border-b border-slate-200 pb-1 flex-col">
                <h1 className="text-lg font-medium">Orders</h1>
            </div>
            <div className="w-full flex flex-col gap-2">
                {orders.map((item) => (
                    <OrderCard orderId={item.id!} orderStatus={item.orderStatus!}/>
                ))}

            </div>
        </div>
    )
}

export default Orders