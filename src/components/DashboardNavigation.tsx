import { Cog, Home, Plus, Shirt, UserCog2, UserPlus2 } from "lucide-react"


const DashboardNavigation = () => {
     return (
        <div className="h-full hidden sm:flex flex-col lg:w-1/4 p-2 gap-2 rounded-sm shadow bg-white border border-slate-100">
            <h1 className="hidden lg:block text-xl text-gray-900 border-b border-gray-300">Navigation</h1>
            <ul className="flex flex-col gap-6 lg:gap-2 justify-center flex-1">
                <li className="p-2 text-gray-800 xl:text-lg hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <Home />
                    <p className="hidden lg:block">Overview</p>
                </li>
                <li className="p-2 text-gray-800 xl:text-lg hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <Plus />
                    <p className="hidden lg:block">Add new product</p>
                </li>
                <li className="p-2 text-gray-800 xl:text-lg hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <Shirt />
                    <p className="hidden lg:block">Manage products</p>
                </li>
                <li className="p-2 text-gray-800 xl:text-lg hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <UserPlus2 />
                    <p className="hidden lg:block">Add new admin user</p>
                </li>
                <li className="p-2 text-gray-800 xl:text-lg hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <UserCog2 />                  
                    <p className="hidden lg:block">Manage Admin Users</p>
                </li>
            </ul>
        </div>
     )
}

export default DashboardNavigation