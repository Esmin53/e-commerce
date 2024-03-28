"use client"

import { useCart } from "@/hooks/use-cart";
import { TColor, TSize } from "@/types/enmus";
import Image from "next/image";

interface CartItemProps {
    product: {
        id: string;
        title: string;
        image: string ;
        color: string | TColor;
        size: string | TSize;
        price: string;
    }
}

const CartItem = ({product}: CartItemProps) => {

    const {removeItem} = useCart()

    return (
        <div key={product.id} className="w-full flex gap-4 p-1.5 bg-slate-50 rounded-sm shadow border border-slate-100 my-2">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
            <Image src={product.image} fill alt={product.title}/>
        </div>
        <div className="flex flex-col flex-wrap flex-1 justify-between gap-1.5">
            <h1 className="text-sm text-slate-700 leading-tight font-medium flex ">
                {product.title}
                </h1>
            <div className="w-full flex items-center justify-between pr-2">
                <p className="font-semibold">{product.price}$</p>
                <div className="flex gap-2 items-center">
                    <p className="text-sm capitalize">{product.color}</p>
                    <div className="w-[1px] h-5 bg-slate-300 shadow-lg border border-slate-300"></div>
                    <p className="text-sm capitalize">{product.size}</p>
                </div>
            </div>
            <div className="w-full flex pr-2 justify-end items-center">
            <p className="text-xs font-semibold text-red-400 cursor-pointer"
            onClick={() => removeItem(product.id)}>Remove</p>
        </div>
        </div>
    </div>
    )
}

export default CartItem