import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Orders from "@/components/Orders"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"


const Page = async () => {

    const session = await getServerSession(authOptions)

    if(!session || !session.user) redirect('/sign-in?redirectUrl=orders')

    return (
        <MaxWidthWrapper>
            <div className="w-full flex flex-col flex-1">
            <div className="w-full flex flex-col p-2 sm:py-4 sm:px-6 gap-2">
                <div className="w-full flex items-center gap-1">
                    <Link href='/'>Home</Link>
                    <span className="font-semibold">/</span>
                    <p className="text-primary font-medium">Orders</p>

                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fashion at your doorstep</h1>
            </div>
                <Orders isAdmin={session.user.isAdmin}/>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page