import { CircleDollarSign, Clock10, DollarSign, Package, PackageOpen, Shirt } from "lucide-react";

const Page = () => {

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl text-gray-900 font-bold">Analytics</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="h-28 bg-white shadow border border-gray-200 rounded-lg flex p-4 gap-4 items-center justify-center">
                    <DollarSign className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg ">Total Revenue</p>
                        <h2 className="text-2xl text-gray-900 font-bold">450 034</h2>
                    </div>
                </div>
                <div className="h-28 bg-white shadow border border-gray-200 rounded-lg flex p-4 gap-4 items-center justify-center">
                    <Package className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg">Total Sales</p>
                        <h2 className="text-2xl text-gray-900 font-bold">2207</h2>
                    </div>
                </div>
                <div className="h-28 bg-white shadow border border-gray-200 rounded-lg flex p-4 gap-4 items-center justify-center">
                    <Clock10 className="w-8 h-8 text-slate-400"/>
                    <div className="flex flex-col ">
                        <p className="text-slate-400 text-lg">Upcoming Revenue</p>
                        <h2 className="text-2xl text-gray-900 font-bold">1200</h2>
                    </div>
                </div>

            </div>
            <div className="w-full flex gap-4">
                <div className="w-8/12 flex flex-col gap-4">
                    <div className="h-80 w-full bg-white shadow rounded-lg border border-gray-200">

                    </div>
                    <div className="w-full grid grid-cols-3 gap-2">
                        <div className="aspect-video bg-white shadow border border-gray-200 rounded-lg flex items-center p-2 gap-2">
                            <div className="p-2 rounded-full bg-slate-200 shadow ">
                                <Shirt className="w-7 h-7 text-gray-700"/>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">In stock</p>
                                <h2 className="text-xl text-gray-900 font-bold">431</h2>
                            </div>
                        </div>
                        <div className="aspect-video bg-white shadow border border-gray-200 rounded-lg flex items-center p-2 gap-2">
                            <div className="p-2 rounded-full bg-slate-200 shadow ">
                                <Package className="w-7 h-7 text-gray-700"/>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Orders</p>
                                <h2 className="text-xl text-gray-900 font-bold">27</h2>
                            </div>
                        </div>
                        <div className="aspect-video bg-white shadow border border-gray-200 rounded-lg flex items-center p-2 gap-2">
                            <div className="p-2 rounded-full bg-slate-200 shadow ">
                                <PackageOpen className="w-7 h-7 text-gray-700"/>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-gray-400 text-sm font-semibold">Remaining</p>
                                <h2 className="text-xl text-gray-900 font-bold">404</h2>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-4/12  flex flex-col gap-4">
                    <div className="w-full h-72 bg-white shadow rounded-lg border border-gray-200 p-2 flex flex-col items-center">
                        <h2 className="w-full text-start p-1 font-semibold text-gray-900">Colors by demand</h2>
                        <div className="w-3/4 aspect-square rounded-full bg-sky-200">

                        </div>
                    </div>
                    <div className="w-full h-64 bg-white shadow rounded-lg border border-gray-200 p-2 flex flex-col items-center">
                        <h2 className="w-full text-start p-1 font-semibold text-gray-900">Sizes by demand</h2>
                        <div className="w-3/4 aspect-square rounded-full bg-red-400">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;