import authOptions from "@/lib/auth"
import { ProductValidator } from "@/lib/validators/product-validator"
import { getServerSession } from "next-auth"

export const POST = async (req: Request) => {
    try {
        console.log("Radi")
        const body = await req.json()

        const session = await getServerSession(authOptions)

        if(session?.user || session?.user.isAdmin !== true) {
            throw new Error("Unauthorized")
        }

        const {title, price, description, sex, collection, sizes, colors, images} = ProductValidator.parse(body)

        return new Response(JSON.stringify("OK"), {status: 200})
    } catch (error) {
        console.log("Ne radi")
        return new Response(JSON.stringify("Server error"), {status: 500})        
    }
}