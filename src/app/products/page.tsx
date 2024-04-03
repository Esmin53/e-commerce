import Filters from "@/components/Filters"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Pagination from "@/components/Pagination";
import ProductsFeed from "@/components/ProductsFeed";
import ResultsFilter from "@/components/ResultsFilter";
import Link from "next/link";

interface ProductsProps {
    params: string,
    searchParams: {
        [key: string]: string;
    }
}

export const dynamic = 'force-dynamic';

const Page = async ({params, searchParams}: ProductsProps) => {

    const queryString = new URLSearchParams()

    for (const key in searchParams) {
        queryString.append(key, searchParams[key]);
      }

    return (
        <MaxWidthWrapper className="min-h-[90vh] flex flex-col">
            <div className="w-full flex flex-col py-4 px-6 gap-2">
                <div className="w-full flex items-center gap-1">
                    <Link href='/'>Home</Link>
                    <span className="font-semibold">/</span>
                    <p className="text-primary font-medium">Products</p>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Explore all products</h1>
            </div>
            <div className="w-full flex flex-col sm:flex-row p-2 gap-2 sm:gap-8 relative flex-1">
                <Filters redirectUrl="products"/>
                <div className="flex-1 flex flex-col gap-2">
                    {/*<ResultsFilter queryString={queryString.toString()} redirectUrl="products" />*/}
                    <ProductsFeed queryString={queryString.toString()} />
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page