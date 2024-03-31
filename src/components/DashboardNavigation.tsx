import { Cog, Home, Plus, Shirt, UserCog2, UserPlus2 } from "lucide-react"
import Link from "next/link"


const DashboardNavigation = () => {
     return (       
            <ul className="flex sm:gap-6 lg:gap-2 justify-evenly w-full border-t border-slate-200 py-2">
                <Link href="/dashboard/overview" className="sm:p-2 text-gray-800 hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    <p className="hidden lg:block">Overview</p>
                </Link>
                <Link href="/dashboard/new-product" className="sm:p-2 text-gray-800 hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <p className="hidden lg:block">Add new product</p>
                </Link>
                <Link href="/dashboard/manage" className="sm:p-2 text-gray-800 hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <Shirt className="w-5 h-5" />
                    <p className="hidden lg:block">Manage products</p>
                </Link>
                <Link href="" className="sm:p-2 text-gray-800 hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <UserPlus2 className="w-5 h-5" />
                    <p className="hidden lg:block">Add new admin user</p>
                </Link>
                <Link href="" className="sm:p-2 text-gray-800 hover:bg-slate-100 rounded-sm cursor-pointer flex items-center gap-2">
                    <UserCog2 className="w-5 h-5" />                  
                    <p className="hidden lg:block">Manage Admin Users</p>
                </Link>
            </ul>
     )
}

export default DashboardNavigation