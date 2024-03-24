import DashboardNavigation from "@/components/DashboardNavigation"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { PropsWithChildren } from "react"


const DashboardLayout = ({children}: PropsWithChildren) => {

    return ( 
        <div className="flex gap-2 h-full bg-blue-50">
            <MaxWidthWrapper className="flex py-6 gap-2 lg:gap-6">
                <DashboardNavigation />
                <div className="flex flex-col gap-2 flex-1 px-1 sm:px-2">
                    {children}
                </div>
            </MaxWidthWrapper>
        </div>
        )
}

export default DashboardLayout