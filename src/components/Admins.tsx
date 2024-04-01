import { users } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import NewAdminForm from "./NewAdminForm";


const Admins = async () => {

    const admins = await db.select({
        id: users.id,
        username: users.username,
    }).from(users).where(eq(users.isAdmin, true))

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className=" bg-white shadow border border-slate-200 rounded-sm flex flex-col p-2 gap-2">
                <h1 className="text-xl font-medium text-gray-900 pb-1 border-b border-slate-200">Admins</h1>
                {admins.map((item) => (<div key={item.id} className="w-full flex items-center justify-between flex-wrap">
                    <p className="text-gray-900 font-medium">{item.username}</p>  
                    <div className="text-sm text-slate-500 flex gap-1">
                        <p className="text-gray-900">Id</p> 
                        <p>{item.id}</p>
                    </div>   
                </div>))}
            </div>
            <NewAdminForm />
        </div>
    );
};

export default Admins;