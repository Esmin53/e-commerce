import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { BarChart2 } from "lucide-react";
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
                    <Link href={'/'} className="text-primary font-medium flex items-center gap-1">
                        <Image src='/logo2.png' width={138} height={20} 
                        alt="Logo" quality={100} className="md:w-[166px] md:h-[24px]"
                        sizes="(max-width: 768px) 100px, 200px" />
                    </Link>
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
                        {session?.user.isAdmin ? (
                            <li className="cursor-pointer flex h-full items-center">
                                <Link href='/dashboard/overview'>
                                    <BarChart2 className="text-gray-900"/>
                                </Link>
                             </li>
                        ) : (<li className="cursor-pointer flex h-full items-center">
                            <Cart />
                        </li>)}
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