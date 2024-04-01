"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CATEGORIES, COLORS, SIZES } from "@/config"
import { products } from "@/db/schema"
import { cn } from "@/lib/utils"
import { TCategory, TColor, TSize } from "@/types/enmus"
import { Loader2 } from "lucide-react"
import { notFound, usePathname, useRouter } from "next/navigation"
import { MouseEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import { ZodError } from "zod"


const Page = () => {
    const [colors, setColors] = useState< string[] >([])
    const [product, setProduct] = useState<typeof products.$inferSelect>()

    const pathname = usePathname()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const productId = pathname.split('/')[3]

    const getProduct = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`)

            if(!response.ok) {
                return notFound()
            }

            const data = await response.json()

            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    if(!product) {
        return <div className="w-full">
        <Heading subtitle="Upadate product general info" title="Manage Products" />
        <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
            <div className="bg-white border border-slate-200 shadow animate-pulse w-full md:w-80 min-h-96">

            </div>
            <div className="bg-white border border-slate-200 shadow animate-pulse flex-1 min-h-96">

            </div>
        </div>
    </div>
    }

    const handleColors = (color: TColor) => {
        console.log("clicked: ", color)
        if(product.colors.includes(color)) {
            setProduct({...product, colors: product?.colors.filter((item) => item !== color)})
        } else {
            setProduct({...product, colors: [...product.colors, color]})
        }
    }

    const handleSizes = (size: TSize) => {
        if(product.sizes.includes(size)) {
            setProduct({...product, sizes: product.sizes.filter((item) => item !== size)})
        } else {
            setProduct({...product, sizes: [...product.sizes, size]})
        }
    }

    const updateProduct = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...product,
                    price: Number(product.price)
                })
            })

            if(!response.ok) {
                toast.error("Please make sure you provided all the required information.")
                setIsLoading(false)
                return
            }

            const data = await response.json()

            setIsLoading(false)
            toast.success("Product details updated successfully")
        } catch (error) {
            if(error instanceof ZodError) {
                toast.error("Please make sure you provided all the required information.")
                setIsLoading(false)
            } else {
                toast.error("There was an error updating product data. Please try again.")
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="w-full">
            <Heading subtitle="Upadate product general info" title="Manage Products" />
            <form className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
                <div className="flex flex-col bg-white border border-slate-200 shadow p-2 gap-4 w-full md:w-80 pb-4">
                    <h1 className="text-lg font-medium pb-1 border-b border-slate-200">General information</h1>
                    <div>
                        <Label>Price</Label>
                        <Input placeholder="Product price" step="0.01" type="number" defaultValue={product.price} 
                        onChange={e => setProduct({...product, price: e.target.value})}/>
                    </div>
                    <div className="w-full flex flex-col">
                        <Label className="mb-2">Colors</Label>
                        <div className="w-full flex flex-wrap gap-3 items-center">
                            {COLORS.map((item) => {
                                return <div key={item.value} className={cn("lg:h-8 w-6 lg:w-8 h-6 rounded-full cursor-pointer shadow", `bg${item.color}`, {
                                    "ring ring-offset-1 ring-primary": product?.colors.includes(item.value as TColor)
                                })}
                                onClick={() => handleColors(item.value as TColor)}/>
                            })}
                        </div>
                        {!product?.colors.length ? <p className="text-xs font-semibold text-red-400 mt-1">Product must have atleast one color</p> : null}
                    </div>
                    <div className="w-full flex flex-col">
                        <Label>Sizes</Label>
                        <div className="w-full h-10 flex justify-between items-center">
                            {SIZES.map((item) => {
                                return <div key={item.value}
                                className={cn(" font-semibold cursor-pointer px-2 py-1 rounded-full", {
                                    "bg-slate-300 border border-slate-200 shadow": product.sizes.includes(item.value as TSize)
                                })} onClick={() => handleSizes(item.value as TSize)}>{item.label}</div>
                            })}
                        </div>
                        {!product.sizes.length ? <p className="text-xs font-semibold text-red-400 mt-1">Product must have atleast on size</p> : null}
                    </div>
                    <div className="w-full flex gap-2">
                        <p className="font-medium">Featured</p>
                        <Switch onCheckedChange={(checked) => setProduct({...product, isFeatured: checked})} defaultChecked={product.isFeatured}/>
                    </div>

                    <Button className="mt-auto" onClick={(e) => {
                        e.preventDefault()
                        setIsLoading(true)
                        updateProduct()}
                        }>{isLoading ? <Loader2 className="animate-spin"/> : "Save changes"}</Button>
                </div>
                <div className="flex flex-col bg-white border border-slate-200 shadow p-2 gap-4 flex-1">
                    <h1 className="text-lg font-medium pb-1 border-b border-slate-200">Product information</h1>
                    <div>
                        <Label>Product Title</Label>
                        <Input placeholder="Product title" defaultValue={product.title}
                        onChange={e => setProduct({...product, title: e.target.value})}/>
                    </div> 

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div className="flex flex-col gap-1">
                        <Label>Sex</Label>
                        <Select onValueChange={(value) => {
                            setProduct({...product, sex: value as "male" | "female" | "unisex"})
                        }}>
                 <SelectTrigger className="h-10 border border-input bg-background rounded-sm">
                            Sex: {product.sex}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="unisex">Unisex</SelectItem>
                        </SelectContent>
                    </Select>
 
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Collection</Label>
                        <Select onValueChange={(value) => {
                            setProduct({...product, collection: value as "summer" | "winter"})
                        }}>
                        <SelectTrigger className="h-10 border border-input bg-background rounded-sm">
                            Collection: {product.category}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="summer">Summer</SelectItem>
                            <SelectItem value="winter">Winter</SelectItem>
                        </SelectContent>
                        </Select>

                    </div>

                </div>
                <div>
                    <Label>Product Description</Label>
                    <Textarea placeholder="Product description" className="min-h-36" defaultValue={product.description} 
                    onChange={e => setProduct({...product, description: e.target.value})}/>
                </div>
                <div className="flex-1">
                    <Label>Categories</Label>
                        <Select onValueChange={(value) => {
                            setProduct({...product, category: value as TCategory})
                        }}>
                        <SelectTrigger className="h-10 border border-input bg-background rounded-sm w-full">
                            Category: {product.category}
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map(({label, value}) => (
                                <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Page