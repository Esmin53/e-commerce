import NewProudctForm from "@/components/NewProductForm"

const Page = () => {

    return <div className="flex-1 flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl text-gray-900 py-1 sm:py-2 font-bold bg-white shadow px-2 rounded-lg">Create new product</h1>
        <NewProudctForm />
    </div>
}

export default Page