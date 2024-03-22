import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Search, ShoppingBasket, User } from "lucide-react";
import AccountTrigger from "./AccountTrigger";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import Cart from "./Cart";

const Navbar = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="w-full h-12 sm:h-16">
            <MaxWidthWrapper className="px-2 h-full">
                <div className="flex w-full h-full items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Ecommerce</h1>
                    <ul className="flex items-center justfy-center gap-4 text-gray-800">
                        <li className="cursor-pointer hover:font-semibold">Home</li>
                        <li className="cursor-pointer hover:font-semibold">Products</li>
                        <li className="cursor-pointer hover:font-semibold">Categories</li>
                        <li className="cursor-pointer hover:font-semibold">About Us</li>
                    </ul>
                    <ul className="flex gap-4 h-full items-center py-5">
                        <li className="cursor-pointer">
                            <Search />
                        </li>
                        <div className="w-px h-full shadow border-l border-gray-300" />
                        <li className="cursor-pointer">
                            <Cart />
                        </li>
                        <div className="w-px h-full shadow border-l border-gray-300" />
                        <li className="cursor-pointer flex items-center justify-center">
                            <AccountTrigger user={session?.user}/>
                        </li>
                    </ul>
                </div>
            </MaxWidthWrapper>
        </div>
    )
};

export default Navbar;