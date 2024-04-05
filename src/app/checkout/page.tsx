"use client"

import CartItem from "@/components/CartItem"
import CheckoutForm from "@/components/CheckoutForm"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import UserOrders from "@/components/UserOrders"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

const Checkout = () => {

    const { items } = useCart()

    return (
        <MaxWidthWrapper>
            <div className="w-full flex flex-col py-4 px-6 gap-2">
                <div className="w-full flex items-center gap-1">
                    <Link href='/'>Home</Link>
                    <span className="font-semibold">/</span>
                    <p className="text-primary font-medium">Checkout</p>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">To Checkout</h1>
            </div>
            <div className="w-full flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 md:gap-10">
                <div className="flex flex-col p-2 w-full sm:w-2/3">
                    <UserOrders />
                    <div className="flex py-2 gap-2 border-b border-slate-300 mb-2">
                        <p className="text-2xl text-slate-600 font-medium">Total products</p>
                        <p className="text-2xl text-gray-900 font-bold">{items.length}</p>
                    </div>
                    {items.map(({product}) => (
                        <CartItem product={product} key={product.id}/>
                    ))}
                </div>
                <CheckoutForm />
            </div>
        </MaxWidthWrapper>
    ) 
}

export default Checkout