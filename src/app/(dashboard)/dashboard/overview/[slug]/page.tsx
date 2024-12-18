import Heading from "@/components/Heading";
import AreaChartComponent from "@/components/charts/AreaChart";
import BarChartComponent from "@/components/charts/BarChart";
import PieChartComponent from "@/components/charts/PieChart";
import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { AreaChartIcon, BarChart2, CircleDollarSign, Clock10, DollarSign, Package, PackageOpen, PieChart, Shirt } from "lucide-react";
import Image from "next/image";


interface PageParams  {
    params: {
        [key: string]: string
    }
}

const Page = async ({params}: PageParams) => {
    const {slug} = params

    const [{ images, title, price }] = await db.select({
        images: products.images,
        title: products.title,
        price: products.price
    }).from(products).where(eq(products.id, slug))

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/overview/${slug}`, {
        cache: "no-store"
    })

    const data = await response.json()

    return (
        <div className="flex flex-col gap-6">
            <Heading subtitle={`Analytics for ${slug}`} title="Analytics" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4">
                <div className="h-28 bg-white shadow border border-gray-200 rounded-sm flex p-4 gap-4 items-center sm:justify-center">
                    <DollarSign className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg ">Total Revenue</p>
                        <h2 className="text-2xl text-gray-900 font-bold">{data.totalRevenue || 0}$</h2>
                    </div>
                </div>
                <div className="h-28 bg-white shadow border border-gray-200 rounded-sm flex p-4 gap-4 items-center sm:justify-center">
                    <Package className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg">Total Sales</p>
                        <h2 className="text-2xl text-gray-900 font-bold">{data.paidOrders || 0}</h2>
                    </div>
                </div>
                <div className="h-28 bg-white shadow border border-gray-200 rounded-sm flex p-4 gap-4 items-center sm:justify-center">
                    <Clock10 className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg">Upcoming Revenue</p>
                        <h2 className="text-2xl text-gray-900 font-bold">{data.upcomingRevenue || 0}$</h2>
                    </div>
                </div>

            </div>
            <div className="w-full flex gap-4">
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex gap-2 p-1">
                        <div className="w-32 aspect-square rounded-sm overflow-hidden relative">
                            <Image src={images[0]} alt="" fill />
                        </div>
                        <div className="flex flex-col gap-2 p-1">
                            <p className="text-slate-500 text-sm">Id: {slug}</p>
                            <h1 className="font-medium text-lg">{title}</h1>
                            <p className="text-xl font-semibold">{price}$</p>
                        </div>
                    </div>
                    <Heading subtitle={`Sales data for ${slug}`} title="Revenue and Sales" />
                    <div className="flex flex-col gap-2 p-2">
                        <div className="w-[95%] ml-auto flex justify-between items-end pb-2 border-b-2 border-slate-200">
                                <p className="font-medium text-gray-600">Annual Sales</p>
                                <AreaChartIcon className="text-gray-700"/>
                            </div>
                        <div className="h-56 sm:h-72 md:h-80 w-full">
                            <AreaChartComponent chartData={data.chartData}/>
                        </div>
                    </div>
                    <Heading subtitle="Overview sales by colors and sizes" title="Colors and Sizes" />
                    <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-2 h-[30rem] sm:h-72 ">
                        <div className="w-full sm:w-1/2 lg:w-1/3">
                            <div className="w-full hidden sm:flex justify-between items-end pb-2 border-b-2 border-slate-200">
                                <p className="font-medium text-gray-600">Colors</p>
                                <PieChart className="text-gray-700"/>
                            </div>
                            <div className="w-full h-full">
                                <PieChartComponent colors={data.colorsArray}/>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-2/3 min-h-56">
                            <div className="w-[92.5%] ml-auto hidden sm:flex justify-between items-end pb-2 border-b-2 border-slate-200">
                                <p className="font-medium text-gray-600">Sizes</p>
                                <BarChart2 className="text-gray-700"/>
                            </div>
                            <div className="w-full h-full">
                                <BarChartComponent sizes={data.sizesArray}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;