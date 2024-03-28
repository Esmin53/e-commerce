import { useCart } from "@/hooks/use-cart"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const CheckoutForm = () => {

    const { items } = useCart()
    const router = useRouter()

    let total = items.reduce((acc, curr) => acc + Number(curr.product.price), 0)

    const handleCheckout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
                method: "POST",
                body: JSON.stringify(items)
            })
                if(!response.ok) {
                    toast.error("Something went wrong. Please try again later.")
                    return
                }

            const data = await response.json()

            router.push(data.url)
        } catch (error) {
            console.log(error)
        }

    }

     return (
        <div className=" bg-white shadow border borders-slate-200 rounded-sm w-full sm:w-1/3 px-4 py-2 flex flex-col gap-3 h-fit">
        <h1 className="text-lg py-1 border-b border-slate-300">Checkout</h1>
        <div className="w-full flex items-center justify-between border-b border-slate-200 shadow-sm pb-2">
            <p>Subtotal: </p>
            <p>{total}$</p>
        </div>
        <div className="w-full flex items-center justify-between border-b border-slate-200 shadow-sm pb-2">
            <p>Shipping: </p>
            <p>0$</p>
        </div>
        <div className="w-full flex items-center justify-between">
            <p className="font-bold">Total: </p>
            <p>{total}$</p>
        </div>
        <Button className="mt-10" onClick={handleCheckout}>Checkout</Button>
    </div>
     )
}

export default CheckoutForm