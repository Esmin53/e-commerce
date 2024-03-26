"use client"

import { ChevronDown, FileBarChart, LogIn, LogOut, User, UserPlus } from "lucide-react"
import { Popover, PopoverTrigger } from "./ui/popover"
import { PopoverContent } from "@radix-ui/react-popover"
import { SessionUser } from "@/types/next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"

const AccountTrigger = ({user}: SessionUser) => {

    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer flex items-center justify-center gap-1 rounded-2xl border border-slate-300 shadow-sm p-1">
                <User  className="w-4 h-4 sm:w-5 sm:h-5"/>
                <ChevronDown  className="w-4 h-4 sm:w-5 sm:h-5"/>
            </PopoverTrigger>
            <PopoverContent className="z-40 bg-slate-50 w-56 p-2 flex flex-col gap-2 rounded-sm border border-gray-200 mt-2 -ml-6">
                <h2 className="text-lg text-gray-900 pb-1 border-b border-gray-200">My Account</h2>
                {
                    user ? (
                        <ul className="flex flex-col gap-2">
                            {user?.isAdmin ? (
                            <li className="flex w-full items-center justify-between hover:bg-slate-100 p-2">
                                <p>Dashboard</p>
                                <FileBarChart className="w-5 h-5 text-gray-700"/>
                            </li>
                            ) : null}
                            <li className="flex w-full items-center justify-between hover:bg-slate-100 p-2"
                            onClick={() => signOut()}>
                                <p>Sign Out</p>
                                <LogOut className="w-5 h-5 text-gray-700"/>
                            </li>
                        </ul>
                    ) : (<div className="flex flex-col gap-2">
                        <Link href='/sign-up' className="flex w-full items-center justify-between hover:bg-slate-100 p-2">
                            <p>Sign Up</p>
                            <UserPlus className="w-5 h-5 text-gray-700"/>
                        </Link>
                        <Link href="/sign-in" className="flex w-full items-center justify-between hover:bg-slate-100 p-2">
                            <p>Sign In</p>
                            <LogIn className="w-5 h-5 text-gray-700"/>
                        </Link>
                    </div>)
                }
            </PopoverContent>
        </Popover>
    )
}

export default AccountTrigger