"use client"

import { cn } from "@/lib/utils"
import { Cog, Home, Plus, Shirt, UserCog2, UserPlus2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


const DashboardNavigation = () => {
    const pathname = usePathname() 
    
    return (       
            <ul className="flex sm:gap-6 lg:gap-2 justify-evenly w-full border-t border-slate-200 py-2">
                <Link href="/dashboard/overview" className={cn("p-2 text-gray-800 cursor-pointer flex items-center gap-2" , {
                    "border-b-2 border-slate-400": pathname.split('/')[2] === "overview"
                })}>
                    <Home className="w-5 h-5" />
                    <p className="hidden lg:block">Overview</p>
                </Link>
                <Link href="/dashboard/new-product" className={cn("p-2 text-gray-800 cursor-pointer flex items-center gap-2" , {
                    "border-b-2 border-slate-400": pathname.split('/')[2] === "new-product"
                })}>
                    <Plus className="w-5 h-5" />
                    <p className="hidden lg:block">Add new product</p>
                </Link>
                <Link href="/dashboard/manage" className={cn("p-2 text-gray-800 cursor-pointer flex items-center gap-2" , {
                    "border-b-2 border-slate-400": pathname.split('/')[2] === "manage"
                })}>
                    <Shirt className="w-5 h-5" />
                    <p className="hidden lg:block">Manage products</p>
                </Link>
            </ul>
     )
}

export default DashboardNavigation