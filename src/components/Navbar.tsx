import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { Search, ShoppingBasket, User } from "lucide-react";

const Navbar = () => {

    const user = false

    return (
        <div className="w-full h-12 sm:h-12">
            <MaxWidthWrapper className="px-2 h-full">
                <div className="flex w-full h-full items-center gap-20">
                <h1 className="text-2xl font-bold">Logo</h1>
                    <ul className="flex gap-4 ml-auto">
                        <li className="cursor-pointer">
                            <Search />
                        </li>
                        <li className="cursor-pointer">
                            <User />
                        </li>
                        <li className="cursor-pointer">
                            <ShoppingBasket />
                        </li>
                    </ul>
                </div>
            </MaxWidthWrapper>
        </div>
    )
};

export default Navbar;