

const ProductCard = () => {

    return (
        <div className="w-full bg-white border border-gray-100 shadow gap-2 rounded-lg overflow-hidden">
        <div className="w-full h-60 bg-red-200">

        </div>
        <div className="flex w-full justify-between pt-2 px-1">
          <p className="text-gray-900 font-semibold">Product Title</p>
          <h2 className="text-xl font-bold">$32</h2>
        </div>
        <div className="w-full flex justify-between px-1 pb-2">
          <p className="text-sm text-slate-400">3 colors</p>
          <p className="text-sm text-slate-400">5 sizes</p>
        </div>
      </div>
    )
}

export default ProductCard