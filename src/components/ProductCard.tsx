import { products } from "@/db/schema"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: typeof products.$inferSelect
}

const ProductCard = ({product}: ProductCardProps) => {

    return (
        <Link href={`/products/${product.id}`} className="w-full gap-2 relative max-w-80 mx-auto">
          <div className="w-full h-60 relative ">
            <Image src={product.images[0]} fill alt="product image"/>
          </div>
        <div className="flex w-full justify-between pt-2 px-1">
          <p className="text-gray-900 font-medium">{product.title}</p>
          <h2 className="text-xl font-bold">${product?.price}</h2>
        </div>
        <div className="w-full flex justify-between px-1 pb-2">
          <p className="text-sm text-slate-400">{product?.colors.length} {product.colors.length > 1 ? 'colors' : 'color'}</p>
          <p className="text-sm text-slate-400">{product?.sizes.length} {product.sizes.length > 1 ? 'sizes' : 'size'}</p>
        </div>
      </Link>
    )
}

export default ProductCard