import CartItem from "@/components/CartItem"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { orderInfo , orders, products } from "@/db/schema"
import authOptions from "@/lib/auth"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface PageParams {
    params: {
        [key: string]: string
    }
}

const Page = async ({params}: PageParams) => {

    const { slug } = params

    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        redirect(`/sign-in?callbackUrl=${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${slug}`)
    }

    const [order] = await db.select().from(orders).where(eq(orders.id, slug))

    if(order.userId !== session.user.id) {
        redirect('/')
    }

    if(!order) return notFound()
    
    const orderInfos = await db.select({
        orderInfoId: orderInfo.id,
        productId: products.id,
        color: orderInfo.color,
        size: orderInfo.size,
        price: products.price,
        image: products.images,
        title: products.title
    }).from(orderInfo)
    .where(eq(orderInfo.orderId, order.id))
    .leftJoin(products, eq(orderInfo.productId, products.id))

    let message: string = ""

    if(order.orderStatus === 'payment_pending') {
        message = "Your order has been proccessed and is awaiting payment."
    } else if (order.orderStatus === 'payment_successful') {
        message = "Your order has been fully payed and is currently waiting to be shipped to your location"
    } else if(order.orderStatus === "in_shipping") {
        message = "Your order is currently being delivered to your location"
    } else if (order.orderStatus === "delivered") {
        message = "Your order has been delivered to your location"
    } else if (order.orderStatus === "canceled") {
        message = "Your order has been cancelled"
    }

    const total = orderInfos.reduce((acc, curr) => acc + Number(curr.price), 0)

    return (
        <MaxWidthWrapper>
                        <div className="w-full flex flex-col p-2 sm:py-4 sm:px-6 gap-2">
                <div className="w-full flex items-center gap-1">
                    <Link href='/'>Home</Link>
                    <span className="font-semibold">/</span>
                    <Link href='/'>Orders</Link>
                    <span className="font-semibold">/</span>
                    <p className="text-primary font-medium truncate">
                        {order.id}</p>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find your style</h1>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-10 border-t border-slate-200 py-2">
                <div className="flex  justify-center flex-col py-8 md:py-12 lg:py-14 px-2 sm:px-4 gap-4 sm:gap-6 lg:gap-8">
                    <p className="text-sm text-sky-600 font-medium">Order successful</p>
                    <h1 className="text-3xl lg:text-4xl font-medium text-gray-900">Thank you for ordering</h1>
                    <p className="text-slate-600">{message} If you have any further questions please contact our support team.</p>
                    <div className="flex gap-1 flex-wrap mt-4 sm:mt-6 lg:mt-12 items-center">
                        <p className="text-sm text-slate-600">Order nr.</p>
                        <p className="text-sme font-medium">{slug}</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-full flex flex-col gap-2">
                    { orderInfos.map((item) => {
                            return <div className="w-full flex gap-2" key={item.orderInfoId}>
                                <div className="w-16 sm:w-20 md:w-26 lg:w-32 aspect-square relative overflow-hidden rounded-md">
                                    {item?.image ? <Image src={item.image[0]} alt="Image title" fill/> : null}
                                </div>
                                <div className="flex-1 flex flex-col gap-3 sm:gap-6 h-full">
                                    <div className="w-full flex items-center justify-between">
                                        <p>{item.title}</p>
                                        <h1 className="text-lg sm:text-xl font-medium">{item.price}$</h1>
                                    </div>
                                    <div className="flex gap-1 items-center text-slate-600">
                                        <p className="capitalize">{item.color}</p>
                                        <span>/</span>
                                        <p className="capitalize">{item.size}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                        <div className="w-full flex flex-col border-t border-slate-300 mt-6 p-1 sm:p-2 py-4 gap-4">
                            <div className="w-full flex items-center justify-between">
                                <p className="text-slate-400 font-medium">Subtotal</p>
                                <p className="font-semibold">${total}</p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-slate-400 font-medium">Shipping</p>
                                <p className="font-semibold">$0</p>
                            </div>
                            <div className="w-full flex items-center justify-between border-y border-slate-200 py-4">
                                <p className="text-gray-900 font-medium text-lg">Total</p>
                                <p className="font-semibold">${total}</p>
                            </div>
                            <Link href='/products' className="w-full text-end text-blue-500 text-sm font-medium mt-4">Continue shopping &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page