"use client"

import { ShoppingBasket, Truck } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import CartItem from "./CartItem"

const Cart = () => {

    const { items, removeItem } = useCart()

    const total = items.reduce((curr, acc) => curr + Number(acc.product.price), 0)

    return (
        <Sheet>
            <SheetTrigger className="relative">
                <ShoppingBasket className="w-5 h-5 sm:w-6 sm:h-6"/>
                <span className="w-4 h-4 bg-primary absolute -bottom-1.5 -right-1.5 rounded-full text-xs text-white font-medium">{items.length}</span>
            </SheetTrigger>
            <SheetContent className="w-screen sm:w-[400px] p-2 sm:p-4 flex flex-col h-screen max-h-screen ">
                <SheetHeader>
                <SheetTitle>My Cart</SheetTitle>
                    <SheetDescription className="text-md">
.                   Cart Total: <span className="font-medium text-gray-900">{total}$</span>
                    </SheetDescription>
                </SheetHeader>
                <div className="w-full gap-2 flex-1 overflow-scroll no-scrollbar">
                    {items && items.map(({product}) => (
                        <CartItem product={product} key={product.id} />
                    ))}
                </div>
                <SheetFooter>

                    <Link href={`/checkout`} className={buttonVariants({variant: "default", className: "w-full"})}>
                        Proceed to checkout
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Cart