"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"


const OrderOptions = ({orderId, priceIds}: {orderId: string, priceIds: {
    price: string | null, 
    quantity: number
    }[]}) => {
    
    const router = useRouter()

    const deleteOrder = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${orderId}`, {
                method: "DELETE"
            })

            if(response.ok && response.status === 200) {
                toast.success("Order deleted successfully")
                router.push("/")
                router.refresh()
            } else if(!response.ok && response.status === 401) {
                toast.success("You are not authorized to perform this action!")
                router.push("/")
            } else if(!response.ok && response.status === 400) {
                toast.success("This order cannot be deleted!")
                router.push("/")
            } 


            const data = await response.json()

        } catch (error) {
            toast.error("There was an error deleting this order. Please try again later.")
        }
    }

    const payOrder = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/${orderId}`, {
                method: "POST",
                body: JSON.stringify(priceIds)
            })

            if(!response.ok && response.status === 401) {
                toast.error("Please sign in before you go to checkout.")
                router.push('/sign-in?redirectUrl=/checkout')
                return
            } else if(!response.ok) {
                toast.error("Something went wrong. Please try again later.")
                return
            }

            const data = await response.json()

            if(data.url) {
                router.push(data.url)
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <div className="w-full grid grid-cols-2 mt-3">
            <button className="text-primary hover:text-primary/80 text-sm font-medium cursor-pointer text-center" onClick={deleteOrder}>Delete This Order</button>
            <p className="text-blue-500 text-sm font-medium cursor-pointer text-center hover:text-blue-600" onClick={payOrder}>Pay Now</p>
        </div>
    )
}

export default OrderOptions