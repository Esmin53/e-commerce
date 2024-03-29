"use client"

import { TColor, TSize } from "@/types/enmus"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"
import { COLORS, SIZES } from "@/config"
import { useEffect, useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/db/schema"
import { toast } from "sonner"

interface AddToCartButtonProps {
    product: typeof products.$inferSelect
}

const AddToCartButton = ({product}: AddToCartButtonProps) => {
    const [pickedSize, setPickedSize] = useState<TSize >()
    const [picekedColor, setPickedColor] = useState<TColor >()
    const [isSuccess, setIsSuccess] = useState<boolean >(false)

    const { addItem } = useCart()

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    return (
        <div className="w-full flex flex-col gap-6">
            <Select onValueChange={(value: TSize) => setPickedSize(value)}>
                <SelectTrigger className="w-full h-10 flex gap-1 items-center">
                    Size: <span className="font-medium">{pickedSize}</span>
                </SelectTrigger>
                <SelectContent>
                    {product.sizes.map((item, index) => (
                        <SelectItem value={item} key={item}>{SIZES.find((size) => size.value === item)?.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex gap-4">
                {product.colors.map((color, index) => (
                    <div className={`w-8 sm:w-10 lg:w-12 flex-wrap aspect-square bg${COLORS.find(item => item.value === color)?.color} rounded-full cursor-pointer 
                    ${color === picekedColor && "ring ring-primary ring-offset-1"}`} key={index} onClick={() => (
                        setPickedColor(color === picekedColor ? undefined : color)
                    )}
                    />
                ))}
            </div>
            <Button className="w-full h-12" size="lg" onClick={() => {
                console.log("Clicked")
                if(!picekedColor || !pickedSize) {
                    toast.error("Please pick a color and a size before adding a product to your cart!")
                    return
                }
                addItem({
                    id: product.id,
                    title: product.title,
                    image: product.images[0],
                    color: picekedColor,
                    size: pickedSize,
                    price: product.price,
                    priceId: product.price_id
                })
                setIsSuccess(true)
            }} disabled={isSuccess}>{isSuccess ? "Item added to cart" : "Add To Cart"}</Button>
        </div>
    )
}

export default AddToCartButton