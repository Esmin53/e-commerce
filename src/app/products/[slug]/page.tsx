import AddToCartButton from "@/components/AddToCartButton"
import Heading from "@/components/Heading"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ProductImageSlider from "@/components/ProductImagesSlider"
import Suggested from "@/components/Suggested"
import { products } from "@/db/schema"
import { db } from "@/lib/db"
import { TCollection, TSex } from "@/types/enmus"
import { and, eq, ne, not } from "drizzle-orm"
import { DollarSign } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"


interface PageParams  {
    params: {
        [key: string]: string
    }
}

const Page = async ({params}: PageParams) => {

    const {slug} = params
   
    const [product] = await db.select().from(products).where(eq(products.id, slug))

    const suggested = await db.select().from(products).where(and(
        eq(products.collection, product.collection as TCollection),
        eq(products.sex, product.sex as TSex),
        ne(products.id, slug)
    )).limit(12)

    console.log("Suggested", suggested)

    if(!product) return notFound()

    return (
        <MaxWidthWrapper>
            <div className="w-full flex flex-col p-2 sm:py-4 sm:px-6 gap-2">
                <div className="w-full flex items-center gap-1">
                    <Link href='/'>Home</Link>
                    <span className="font-semibold">/</span>
                    <Link href='/products'>Products</Link>
                    <span className="font-semibold">/</span>
                    <p className="text-primary font-medium truncate">
                        {product.title
                    }</p>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find your style</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full min-h-[65vh] sm:p-2 p-1">
                <div className="h-fit sm:h-full relative">
                    <ProductImageSlider images={product.images}/>
                </div>
                <div className="h-full flex flex-col gap-3 sm:gap-5">
                    <h1 className="text-2xl lg:text-3xl font-semibold capitalize">{product.title}</h1>
                    <p className="text-2xl lg:text-3xl font-semibold capitalize flex items-center">
                        <DollarSign className="text-slate-400 w-7 lg:w-8 h-7 lg:h-8 font-bold"/>
                        {product.price}
                    </p>
                    <p className="px-2 text-gray-500 lg:text-md text-sm">{product.description}</p>
                    <div className="w-full flex items-center justify-between capitalize">
                        <p>{product.collection} collection</p>
                        <p className="capitalize">{product.sex}</p>
                    </div>
                    <AddToCartButton product={product} />
                </div>
            </div>
            {suggested.length ? (
                <div className="flex flex-col py-6">
                    <Heading subtitle="Complete Your Look" title="You Might Also Like"/>
                    <Suggested suggested={suggested} />
                </div>
            ) : null}
        </MaxWidthWrapper>
    )
}

export default Page