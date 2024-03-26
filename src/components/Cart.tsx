"use client"

import { ShoppingBasket } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

const Cart = () => {

    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingBasket className="w-5 h-5 sm:w-6 sm:h-6"/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>My Cart</SheetTitle>
                    <SheetDescription>
.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default Cart