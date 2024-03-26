"use client"

import { TColor, TSize } from "@/types/enmus"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"
import { COLORS, SIZES } from "@/config"
import { useState } from "react"

interface AddToCartButtonProps {
    id: string,
    sizes: TSize[],
    colors: TColor[]
}

const AddToCartButton = ({id, sizes, colors}: AddToCartButtonProps) => {
    const [pickedSize, setPickedSize] = useState<TSize >()
    const [picekedColor, setPickedColor] = useState<TColor >()


    return (
        <div className="w-full flex flex-col gap-6">
            <Select onValueChange={(value: TSize) => setPickedSize(value)}>
                <SelectTrigger className="w-full h-10 flex gap-1 items-center">
                    Size: <span className="font-medium">{pickedSize}</span>
                </SelectTrigger>
                <SelectContent>
                    {sizes.map((item, index) => (
                        <SelectItem value={item} key={item}>{SIZES.find((size) => size.value === item)?.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex gap-4">
                {colors.map((color, index) => (
                    <div className={`w-8 sm:w-10 lg:w-12 flex-wrap aspect-square bg${COLORS.find(item => item.value === color)?.color} rounded-full cursor-pointer 
                    ${color === picekedColor && "ring ring-primary ring-offset-1"}`} key={index} onClick={() => (
                        setPickedColor(color === picekedColor ? undefined : color)
                    )}
                    />
                ))}
            </div>
            <Button className="w-full h-12" size="lg">Add To Cart</Button>
        </div>
    )
}

export default AddToCartButton