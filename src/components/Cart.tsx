"use client"

import { ShoppingBasket } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

const Cart = () => {

    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingBasket />
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