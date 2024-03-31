import Filters from "@/components/Filters";
import ResultsFilter from "@/components/ResultsFilter";
import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { RefreshCwOff, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductsProps {
    params: string,
    searchParams: {
        [key: string]: string;
    }
}

const Page = async ({params, searchParams}: ProductsProps) => {

    const queryString = new URLSearchParams()

    for (const key in searchParams) {
        queryString.append(key, searchParams[key]);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${queryString.toString()}`, {cache: "no-store"})

      const data: typeof products.$inferSelect[] = await response.json()


    return (
        <div className="w-full flex flex-col sm:flex-row py-2 gap-2 sm:gap-8">
            <Filters redirectUrl="dashboard/manage"/>
            <div className="w-full flex flex-col gap-2">
            <ResultsFilter queryString={queryString.toString()} redirectUrl="dashboard/manage"/>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 h-fit">
                {
                    data.map((item) => (
                        <div className="flex gap-2 sm:p-2 p-1">
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
            </div>
        </div>
    )
};

export default Page;