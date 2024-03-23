

const DashboardNavigation = () => {
     return (
        <div className="h-full w-1/4 flex flex-col p-2 gap-2 rounded-md shadow-sm">
            <h1 className="text-2xl text-gray-900p py-2 border-b border-gray-300">Navigation</h1>
            <ul className="flex flex-col gap-2">
                <li className="p-2 py-1 text-gray-800 text-lg hover:bg-slate-100 rounded-sm cursor-pointer">Overview</li>
                <li className="p-2 py-1 text-gray-800 text-lg hover:bg-slate-100 rounded-sm cursor-pointer">Add new product</li>
                <li className="p-2 py-1 text-gray-800 text-lg hover:bg-slate-100 rounded-sm cursor-pointer">Manage products</li>
                <li className="p-2 py-1 text-gray-800 text-lg hover:bg-slate-100 rounded-sm cursor-pointer">Add new admin user</li>
                <li className="p-2 py-1 text-gray-800 text-lg hover:bg-slate-100 rounded-sm cursor-pointer">Manage admin users</li>
            </ul>
        </div>
     )
}

export default DashboardNavigation