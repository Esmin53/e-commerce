import NewProudctForm from "@/components/NewProductForm"

const Page = () => {

    return <div className="flex-1 flex flex-col gap-2 p-2">
        <h1 className="text-2xl text-gray-900p py-2 border-b border-gray-300">Create new product</h1>
        <NewProudctForm />
    </div>
}

export default Page