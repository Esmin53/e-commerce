import { products } from "@/db/schema";
import { ChevronDown, RefreshCwOff, ShoppingBasket } from "lucide-react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Pagination from "./Pagination";
import ResultsFilter from "./ResultsFilter";


const ProductsFeed = async ({queryString}: {queryString: string}) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${queryString.toString()}`, {cache: "no-store"})

    const data: {
        records: typeof products.$inferSelect[],
        totalResults: number
    } = await response.json()

    if(!response.ok) {
        return <div className="h-full w-full flex flex-col justify-center items-center gap-2">
            <RefreshCwOff className="w-28 h-28 text-slate-300"/>
            <h1 className="text-xl text-slate-400 font-medium text-center">There was an error getting getting your results.
            <br /> Please refresh the browser or come back later.</h1>
            <p className="text-sm text-end w-1/2 py-1 text-slate-400 font-medium">Back to <Link href='/' className="text-primary">Homepage?</Link></p>
        </div>        
    }

    if(!data || !data?.records?.length) {
        return <div className="h-full w-full flex flex-col justify-center items-center gap-2">
            <ShoppingBasket className="w-28 h-28 text-slate-300"/>
            <h1 className="text-xl text-slate-400 font-medium text-center">Looks like there are no items that match your criteria.
            <br /> Please check your filters and try again.</h1>
            <p className="text-sm text-end w-1/2 py-1 text-slate-400 font-medium">Back to <Link href='/' className="text-primary">Homepage?</Link></p>
        </div>
    }

    return (
        <div className="w-full flex-1 relative flex flex-col gap-4">
            <ResultsFilter queryString={queryString} redirectUrl="products" totalResults={data.totalResults}/>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-14">
                {data.records?.map((item) => (
                    <ProductCard product={item} key={item.id}/>
                ))}
            </div>
            <Pagination totalResults={data.totalResults} queryString={queryString} redirectUrl="products"/>
        </div>
    )

}

export default ProductsFeed;