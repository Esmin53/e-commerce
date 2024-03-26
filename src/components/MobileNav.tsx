import { AlignJustify } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Link from "next/link"


const MobileNav = () => {
    
    return (
        <Sheet>
        <SheetTrigger>
            <AlignJustify className="w-5 h-5 sm:w-6 sm:h-6"/>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
.
                </SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col gap-2">
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
        </SheetContent>
    </Sheet>
    )
}

export default MobileNav