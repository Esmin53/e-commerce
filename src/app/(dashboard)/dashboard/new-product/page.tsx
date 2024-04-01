import Heading from "@/components/Heading"
import NewProudctForm from "@/components/NewProductForm"

const Page = () => {

    return <div className="flex-1 flex flex-col gap-2">
        <Heading subtitle="Create new products" title="New Product" />
        <NewProudctForm />
    </div>
}

export default Page