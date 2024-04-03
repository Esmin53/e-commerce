import Filters from "@/components/Filters";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import ResultsFilter from "@/components/ResultsFilter";
import { products } from "@/db/schema";
import Image from "next/image";
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${queryString.toString()}`, {cache: "no-store"})

      const data: {
        records: typeof products.$inferSelect[],
        totalResults: number
    } = await response.json()


    return (
        <div className="min-h-[75vh] flex flex-col">
            <Heading subtitle="Manage or overview products" title="Products" />
            <div className="w-full flex flex-col sm:flex-row py-2 gap-2 sm:gap-8 flex-1">
            <Filters redirectUrl="dashboard/manage"/>
            <div className="w-full flex flex-col gap-2 relative h-full">
            <ResultsFilter queryString={queryString.toString()} redirectUrl="dashboard/manage" totalResults={data.totalResults}/>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 h-fit pb-12">
                {
                    data?.records?.map((item) => (
                        <div className="flex gap-2 sm:p-2 p-1" key={item.id}>
                            <div className="relative aspect-square w-16 sm:h-28 sm:w-28 md:h-32 md:w-32  overflow-hidden rounded-lg flex-shrink-0">
                                <Image fill src={item.images[0]} alt={item.title} />
                            </div>
                            <div className="flex flex-col justify-evenly h-fit sm:mn-h-28 md:min-h-32">
                                <p className="text-xs text-slate-500 font-medium">ID: {item.id}</p>
                                <div className="w-full flex justify-between items-start gap-2">
                                    <p className="text-sm font-semibold">{item.title}</p>
                                    <h2 className="font-medium text-lg">{item.price}$</h2>
                                </div>
                                <div className="w-full grid grid-cols-2 gap-2">
                                    <Link href={`/dashboard/manage/${item.id}`} className="text-primary text-center text-sm font-medium">
                                        Manage
                                    </Link>
                                    <Link href={`/dashboard/overview/${item.id}`} className="text-primary text-center text-sm font-medium">
                                        Overview
                                    </Link>
                                </div>

                            </div>

                        </div>
                    ))
                }
            </div>
            <Pagination totalResults={data.totalResults} queryString={queryString.toString()} redirectUrl="dashboard/manage"/>
            </div>
        </div>
        </div>
    )
};

export default Page;