import { orders } from "@/db/schema";
import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

type Params = {
    [key: string]: {
        slug: string
    }
}

export const DELETE = async (req: Request, params: Params) => {
    try {
        const session = await getServerSession(authOptions);

        const {slug} = params.params;

        if(!session || !session.user) {
            return new Response(JSON.stringify("Unauthorized"), { status: 401 });
        }

        const [orderExists] = await db.select().from(orders).where(eq(orders.id, slug))

        if(!orderExists) {
            return new Response(JSON.stringify("Not Found"), { status: 404 });
        }

        if(orderExists.userId !== session.user.id ) {
            if(session.user.isAdmin === false) {
                return new Response(JSON.stringify("Unauthorized"), { status: 401 });      
            }      
        }

        if(orderExists.isPaid == true || orderExists.orderStatus !== "payment_pending") {
            return new Response(JSON.stringify("Bad Request"), { status: 400 })
        }

        await db.delete(orders).where(eq(orders.id, orderExists.id))

        return new Response(JSON.stringify("OK"), { status: 200 })
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify(error), { status: 200 })
    }
}