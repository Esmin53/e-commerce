"use client"

import { Check, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { toast } from "sonner"

interface UpdatePriceProps {
    price: number,
    id: string,
    priceId: string
}

const UpdatePrice = ({price, id, priceId}: UpdatePriceProps) => {
    const [priceState, setPriceState] = useState(price);
    const [isLoading, setIsLoading] = useState<boolean >(false)

    const handleSubmit = async (value: number) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/new-product/price`, {
                method: 'PUT',
                body: JSON.stringify({
                    newPrice: value,
                    id,
                    priceId
                })
            })

            const data = await response.json()

            setIsLoading(false)
            toast.success("Product price updated successfully")
        } catch (error) {
            setIsLoading(true)
            toast.error("Something went wrong. Please try again later!")
        }
    }

    return (
        <div className="w-full flex gap-2" >
            <Input placeholder="Price" type="number" value={priceState} onChange={(e) =>setPriceState(Number(e.target.value))}/>
            <Button onClick={(e) => {
                e.preventDefault()
                setIsLoading(true)
                handleSubmit(priceState)
            }}>
                {isLoading ? <Loader2 className="animate-spin" /> : <Check />}
            </Button>
        </div>
    )
}

export default UpdatePrice