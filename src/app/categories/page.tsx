import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Image from "next/image"
import Link from "next/link"


const Categories = () => {

    return (
        <MaxWidthWrapper>
            <div className="w-full flex flex-col p-2 sm:py-4 sm:px-6 gap-2">
                <div className="w-full flex items-center gap-1">
                    <Link href='/'>Home</Link>
                    <span className="font-semibold">/</span>
                    <p className="text-primary font-medium truncate">
                        Categories</p>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find your style</h1>
            </div>
            <div className="w-full p-1 sm:p-2 gap-2 sm:gap-4 grid grid-cols-1 sm:grid-cols-3">
                <Link href="/products?category=shirts">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/shirts.jpg" alt="shirts" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Shirts</h1>
                </Link>
                <Link href="/products?category=tshirts">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/tshirts.jpg" alt="tshirts" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">T-shirts</h1>
                </Link>
                <Link href="/products?category=sweaters">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/sweaters.jpg" alt="sweaters" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Sweaters</h1>
                </Link>
                <Link href="/products?category=pants">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/pants.jpg" alt="pants" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Pants</h1>
                </Link>
                <Link href="/products?category=jackets">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/jackets.jpg" alt="jackets" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Jackets</h1>
                </Link>
                <Link href="/products?category=dresses">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/dresses.jpg" alt="dresses" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Dresses</h1>
                </Link>
                <Link href="/products?category=coats">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/coats.jpg" alt="coats" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Coats</h1>
                </Link>
                <Link href="/products?category=shoes">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/shoes.jpg" alt="shoes" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Shoes</h1>
                </Link>
                <Link href="/products?category=boots">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/boots.jpg" alt="boots" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Boots</h1>
                </Link>
                <Link href="/products?category=glasses">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/glasses.jpg" alt="glasses" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Glasses</h1>
                </Link>
                <Link href="/products?category=accesories">
                    <div className="aspect-video bg-slate-200 relative">
                        <Image src="/categories/accessories.jpg" alt="accesories" fill className="object-center obejct-cover"/>
                    </div>
                    <h1 className="p-2 text-lg md:text-xl font-medium">Accesories</h1>
                </Link>
            </div>
        </MaxWidthWrapper>
    )
}

export default Categories