"use client"

import { Facebook, Github, Instagram, LucideMail } from "lucide-react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import { usePathname } from "next/navigation"


const FooterComponent = () => {
    
    const pathname = usePathname()
  
    if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up') || pathname.startsWith('/dashboard')) {
      return null;
    }
    return (
        <div className="w-full flex flex-col justify-center border-t-2 border-slate-100 bg-white min-h-20 mt-4">
            <MaxWidthWrapper>
                <div className="flex flex-wrap items-start justify-between p-2 gap-4 py-6 sm:py-16">
                    <h1 className="text-primary text-2xl lg:text-xl font-semibold h-full flex items-start w-full lg:w-fit 
                    justify-center lg:justify-start">Ecommerce</h1>
                    <div className="flex flex-col gap-2 w-full max-w-96">
                        <h1 className="text-xl text-gray-900 font-semibold">More About Us</h1>
                        <p className="text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ipsa praesentium excepturi ipsam fuga quisquam tenetur quibusdam architecto rerum quia.</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-start">
                        <h1 className="text-xl text-gray-900 font-semibold">Explore</h1>
                        <Link href='/' className="text-gray-600 font-medium">Homepage</Link>
                        <Link href='/products' className="text-gray-600 font-medium">Products</Link>
                        <Link href='/categories' className="text-gray-600 font-medium">Categories</Link>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex gap-2 mb-4 items-center">
                            <LucideMail className="text-gray-900 w-5 h-5"/>
                            <p className="font-medium text-gray-600">esmin.tufekcic@gmail.com</p>
                        </div>
                        <div>
                            <h1 className="text-xl text-gray-900 font-semibold">Contact Me</h1>
                            <div className="flex gap-4 py-2">
                                <a href='https://github.com/Esmin53/e-commerce' target="_blank">
                                    <Github  className="text-gray-900 w-5 h-5"/>
                                </a>
                                <a href='https://www.facebook.com/esmin.tufekcic/' target="_blank">
                                    <Facebook className="text-gray-900 w-5 h-5"/>
                                </a>
                                <a href='https://www.instagram.com/tufekciic/' target="_blank">
                                    <Instagram className="text-gray-900 w-5 h-5"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default FooterComponent