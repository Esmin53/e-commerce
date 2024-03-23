import DashboardNavigation from "@/components/DashboardNavigation"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { PropsWithChildren } from "react"


const DashboardLayout = ({children}: PropsWithChildren) => {

    return <MaxWidthWrapper>
        <div className="flex gap-2">
            <DashboardNavigation />
            {children}
        </div>
    </MaxWidthWrapper> 
}

export default DashboardLayout