import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ChevronDown, Search, ShoppingBasket, User } from "lucide-react";
import AccountTrigger from "./AccountTrigger";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import Cart from "./Cart";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Navbar = async () => {

    const session = await getServerSession(authOptions)

    return (
        <div className="w-full h-12 sm:h-16">
            <MaxWidthWrapper className="px-2 h-full">
                <div className="flex w-full h-full items-center justify-between">
                    <h1>Ecommerce</h1>
                    <ul className="hidden sm:flex items-center justfy-center gap-2 lg:gap-4 text-gray-800">
                        <li className="cursor-pointer hover:font-semibold">
                            <Link href='/'>Home</Link>
                        </li>
                        <li className="cursor-pointer hover:font-semibold">
                        <Link href='/products'>Products</Link>
                        </li>
                        <li className="cursor-pointer hover:font-semibold">
                        <Link href='/categories'>Categories</Link>
                        </li>
                        <li className="cursor-pointer hover:font-semibold">
                            <Link href='/about-us'>About Us</Link>
                        </li>
                    </ul>
                    <ul className="flex gap-2 lg:gap-4 h-full items-center py-3 sm:py-5">
                        <li className="cursor-pointer flex h-full items-center">
                            <Cart />
                        </li>
                        <div className="w-px h-full shadow border-l border-gray-300" />
                        <li className="flex h-full items-center">
                            <AccountTrigger user={session?.user}/>
                        </li>
                        <div className="w-px h-full shadow border-l border-gray-300 flex sm:hidden" />
                        <li className="flex h-full items-center sm:hidden">
                            <MobileNav />
                        </li>
                    </ul>
                </div>
            </MaxWidthWrapper>
        </div>
    )
};

export default Navbar;