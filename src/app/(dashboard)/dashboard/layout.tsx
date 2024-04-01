import DashboardNavigation from "@/components/DashboardNavigation"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import authOptions from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"


const DashboardLayout = async ({children}: PropsWithChildren) => {
    const session = await getServerSession(authOptions)

    if(!session || session.user.isAdmin === false) {
        redirect("/")
    }

    return ( 
        <div className="flex gap-2 h-full bg-blue-50">
            <MaxWidthWrapper className="flex flex-col gap-2 lg:gap-6 relative">
                <DashboardNavigation />
                <div className="flex flex-col gap-2 flex-1 px-1 sm:px-2">
                    {children}
                </div>
            </MaxWidthWrapper>
        </div>
        )
}

export default DashboardLayout