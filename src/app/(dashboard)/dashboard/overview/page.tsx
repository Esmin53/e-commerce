import Admins from "@/components/Admins";
import Heading from "@/components/Heading";
import Orders from "@/components/Orders";
import AreaChartComponent from "@/components/charts/AreaChart";
import { AreaChartIcon, Clock10, DollarSign, Package, PackageCheck, PackageOpen, Shirt } from "lucide-react";

export const dynamic = 'force-dynamic';

const Page = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/overview`, {
        cache: "no-store"
    })

    const data = await response.json()

    return (
        <div className="flex-1 w-full h-full flex flex-col gap-4">
            <Heading subtitle="Overview sales and manage admins and orders" title="Overview"/>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <div className="h-20 sm:h-28 bg-white shadow border border-gray-200 rounded-sm flex p-4 gap-4 items-center justify-start sm:justify-center">
                    <DollarSign className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 sm:text-lg ">Total Revenue</p>
                        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-900 font-bold">{data?.totalRevenue || 0}$ </h2>
                    </div>
                </div>
                <div className="h-20 sm:h-28 bg-white shadow border border-gray-200 rounded-sm flex p-4 gap-4 items-center justify-start sm:justify-center">
                    <Package className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 sm:text-lg">Total Sales</p>
                        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-900 font-bold">{data.paidOrders}</h2>
                    </div>
                </div>
                <div className="h-20 sm:h-28 bg-white shadow border border-gray-200 rounded-sm flex p-4 gap-4 items-center justify-start sm:justify-center">
                    <Clock10 className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 sm:text-lg">Upcoming Revenue</p>
                        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-900 font-bold">{data.upcomingRevenue || 0}$</h2>
                    </div>
                </div>

            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="h-18 sm:h-24 bg-white shadow border border-gray-200 rounded-sm flex items-center p-2 gap-2">
                            <div className="p-2 w-8 h-8 rounded-full bg-slate-200 shadow flex items-center justify-center">
                                <Shirt />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Total Products</p>
                                <h2 className="text-xl text-gray-900 font-bold">{data.productsCount}</h2>
                            </div>
                        </div>
                        <div className="h-18 sm:h-24 bg-white shadow border border-gray-200 rounded-sm flex items-center p-2 gap-2">
                            <div className="p-2 w-8 h-8 rounded-full bg-slate-200 shadow flex items-center justify-center">
                                <PackageOpen />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Paid orders</p>
                                <h2 className="text-xl text-gray-900 font-bold">{data.paidOrders}</h2>
                            </div>
                        </div>
                        <div className="h-18 sm:h-24 bg-white shadow border border-gray-200 rounded-sm flex items-center p-2 gap-2">
                            <div className="p-2 w-8 h-8 rounded-full bg-slate-200 shadow flex items-center justify-center">
                                <Package />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Unpaid orders</p>
                                <h2 className="text-xl text-gray-900 font-bold">{data.unpaidOrders}</h2>
                            </div>
                        </div>
                        <div className="h-18 sm:h-24 bg-white shadow border border-gray-200 rounded-sm flex items-center p-2 gap-2">
                            <div className="p-2 w-8 h-8 rounded-full bg-slate-200 shadow flex items-center justify-center">
                                <PackageCheck/>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Total orders</p>
                                <h2 className="text-xl text-gray-900 font-bold">{data.unpaidOrders + data.paidOrders}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className="w-full ml-auto flex justify-between items-end pb-2 border-b-2 border-slate-200">
                            <p className="font-medium text-gray-600">Annual Sales</p>
                            <AreaChartIcon className="text-gray-700"/>
                        </div>
                        <div className="h-56 sm:h-72 md:h-80 w-full py-2">
                            <AreaChartComponent chartData={data.dataArray} />
                        </div>
                    </div>

                <Heading subtitle="Manage and Create Admins" title="Admins"/>
                <Admins />
                <Heading subtitle="Manage Orders" title="Orders"/>  
                <Orders />
        </div>
    )
}

export default Page;