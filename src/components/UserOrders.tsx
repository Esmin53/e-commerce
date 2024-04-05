"use client"

import { useEffect, useState } from "react"
import { orders as ordersType} from "@/db/schema"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { format } from "date-fns"
import Link from "next/link"

const UserOrders = () => {
    const [orders, setOrders] = useState< typeof ordersType.$inferInsert[]>([])

    const getOrders = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`)

            const data = await response.json()
    
            setOrders(data.userOrders)

        } catch (error) {
            
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    if(!orders) {
        return <div className="w-full h-8 bg-slate-100 shadow animate-pulse border border-slate-200 rounded-lg"></div>
    }

    if(!orders.length) {
        return <div className="w-full h-8  border-b border-slate-200">
            <p className="text-sm font-medium">No previous orders</p>
        </div>
    }

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger>Previous Orders</AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full flex flex-col gap-2">
                            {
                                orders.map((item) => (
                                    <div className="w-full flex border-b border-slate-200 p-1 justify-between flex-wrap" key={item.id}>
                                        <div className="flex flex-col gap-1">
                                            {item.createdAt && <p className="text-xs font-medium">{format(new Date(item.createdAt), "P")}</p>} 
                                            <Link href={`/orders/${item.id}`} className="text-sm text-slate-500">{item.id}</Link>
                                        </div>
                                        
                                        <p className="text-sm">{item.orderStatus}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default UserOrders