"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"
import { toast } from "sonner"

const OrderStatus = ({orderStatus ,orderId}: {
    orderStatus: string | null
    orderId: string | null 
}) => {
    const [orderState, setOrderState] = useState(orderStatus)


    const handleChange = async (value: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/orders/${orderId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    value
                })
            })

            if(!response.ok) {
                toast.error("Something went wrong and order status could not be updated. Please try again!")
                return
            }
            setOrderState(value)
            const data = await response.json()

        } catch (error) {
            toast.error("Something went wrong and order status could not be updated. Please try again!")
        }
    }

    return (
        <Select onValueChange={(value) => {
            handleChange(value)
        }}>
            <SelectTrigger className="w-full sm:w-60">
                {orderState}
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="payment_pending">Payment Pending</SelectItem>
                <SelectItem value="payment_successful">Payment Successful</SelectItem>
                <SelectItem value="in_shipping">In Shipping</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
        </Select>
    )
} 

export default OrderStatus