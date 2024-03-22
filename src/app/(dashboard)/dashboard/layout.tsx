import { PropsWithChildren } from "react"


const DashboardLayout = ({children}: PropsWithChildren) => {

    return <div className="bg-red-300">
        {children}
    </div>  
}

export default DashboardLayout