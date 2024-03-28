import { Clock10, DollarSign, Package, PackageCheck, PackageOpen, Shirt } from "lucide-react";


const Page = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/overview`, {
        cache: "no-store"
    })

    const data = await response.json()

    return (
        <div className="flex-1 w-full h-full flex flex-col gap-4 p-2">
                        <div className="grid grid-cols-3 gap-4">
                <div className="h-28 bg-white shadow border border-gray-200 rounded-lg flex p-4 gap-4 items-center justify-center">
                    <DollarSign className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg ">Total Revenue</p>
                        <h2 className="text-2xl text-gray-900 font-bold">{data.totalRevenue}$</h2>
                    </div>
                </div>
                <div className="h-28 bg-white shadow border border-gray-200 rounded-lg flex p-4 gap-4 items-center justify-center">
                    <Package className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg">Total Sales</p>
                        <h2 className="text-2xl text-gray-900 font-bold">{data.paidOrders}</h2>
                    </div>
                </div>
                <div className="h-28 bg-white shadow border border-gray-200 rounded-lg flex p-4 gap-4 items-center justify-center">
                    <Clock10 className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg">Upcoming Revenue</p>
                        <h2 className="text-2xl text-gray-900 font-bold">{data.upcomingRevenue}$</h2>
                    </div>
                </div>

            </div>
            <div className="w-full flex gap-4">
                <div className="w-2/3 h-72 bg-white border border-gray-100 shadow rounded-lg">

                </div>
                <div className="w-1/3 h-72 bg-white border border-gray-100 shadow rounded-lg">

                </div>
            </div>
            <div className="w-full grid grid-cols-4 gap-2">
                        <div className="h-24 bg-white shadow border border-gray-200 rounded-lg flex items-center p-2 gap-2">
                            <div className="p-2 w-8 h-8 rounded-full bg-slate-200 shadow flex items-center justify-center">
                                <Shirt />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Total Products</p>
                                <h2 className="text-xl text-gray-900 font-bold">{data.productsCount}</h2>
                            </div>
                        </div>
                        <div className="h-24 bg-white shadow border border-gray-200 rounded-lg flex items-center p-2 gap-2">
                            <div className="p-2 w-8 h-8 rounded-full bg-slate-200 shadow flex items-center justify-center">
                                <PackageOpen />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Paid orders</p>
                                <h2 className="text-xl text-gray-900 font-bold">{data.paidOrders}</h2>
                            </div>
                        </div>
                        <div className="h-24 bg-white shadow border border-gray-200 rounded-lg flex items-center p-2 gap-2">
                            <div className="p-2 w-8 h-8 rounded-full bg-slate-200 shadow flex items-center justify-center">
                                <Package />
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Unpaid orders</p>
                                <h2 className="text-xl text-gray-900 font-bold">{data.unpaidOrders}</h2>
                            </div>
                        </div>
                        <div className="h-24 bg-white shadow border border-gray-200 rounded-lg flex items-center p-2 gap-2">
                            <div className="p-2 w-8 h-8 rounded-full bg-slate-200 shadow flex items-center justify-center">
                                <PackageCheck/>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Total orders</p>
                                <h2 className="text-xl text-gray-900 font-bold">{data.unpaidOrders + data.paidOrders}</h2>
                            </div>
                        </div>

                    </div>
                    <div className="w-full h-40 bg-white rounded-lg border border-gray-100 shadow flex flex-col p-2">
                        <div className="w-full"></div>
                    </div>  
        </div>
    )
}

export default Page;