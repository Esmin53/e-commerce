import { users } from "@/db/schema"
import { db } from "@/lib/db"

export const POST = async () => {
    try {


        
        return new Response(JSON.stringify("Ok"), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
}