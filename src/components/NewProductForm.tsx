"use client"

import { SelectTrigger } from "@radix-ui/react-select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { COLORS, SIZES } from "@/config"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"
import { UploadButton } from "@uploadthing/react"
import Image from "next/image"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { toast } from "sonner"
import { useForm, SubmitHandler } from "react-hook-form"
import { ProductValidator, TProductValidator } from "@/lib/validators/product-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodError } from "zod"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const NewProudctForm = () => {
    const [colors, setColors] = useState<string[]>(["black"])
    const [sizes, setSizes] = useState<string[] >(["m"])
    const [images, setImages] = useState<string []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()


    const handleColors = (color: string) => {
        if(colors.includes(color)) {
            setColors(colors.filter((item) => item !== color))

        } else {
            setColors([...colors, color])
        }
    }

    const handleSizes = (size: string) => {
        if(sizes.includes(size)) {
            setSizes(sizes.filter((item) => item !== size))
        } else {
            setSizes([...sizes, size])
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<TProductValidator>({
        resolver: zodResolver(ProductValidator)
    })

    const onSubmit: SubmitHandler<TProductValidator> = async ({title, price, description, sex, collection}) => {
        setIsLoading(true)
        try {
            if(!images.length) {
                toast.error("Each product must have atleast one image!")
                return
            }
            if(!sizes.length) {
                toast.error("Each product must have atleast one size!")
                return
            }
            if(!colors.length) {
                toast.error("Each product must have atleast one color!")
                return
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/new-product`, {
                method: "POST",
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    sex,
                    collection,
                    colors,
                    sizes,
                    images
                })
            })

            setIsLoading(false)
            if(!response.ok && response.status === 409) {
                toast.error("Product with that title already exists!")
                return
            }
            if(!response.ok && response.status === 400) {
                toast.error("Please make sure to fill all the required fields before trying to create new product!")
                return
            }
            if(!response.ok) {
                throw new Error()
            }

            const data = await response.json()
 
            toast.success("Your product has been created successfully")
            router.push(`/dashboard/overview/${data.id}`)

        } catch (error) {
            setIsLoading(false)
            if(error instanceof ZodError) {
                toast.error("Please make sure to fill all the required fields before trying to create new product!")
            } else {
                toast.error("Something went wrong, please try again.")
            }
        }
    } 

    return (
        <div className="w-full h-full p-2 bg-slate-100 rounded-sm border border-slate-200 shadow-sm">
            <div aria-hidden="true" className="bg-black bg-white bg-red-400 bg-gray-700 bg-gray-300 
            bg-yellow-400 bg-blue-400 bg-emerald-400 bg-pink-400 bg-purple-400 bg-orange-400" />
            <form className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>Product Title</Label>
                    <Input placeholder="Product title" {...register('title')}/>
                    {errors.title ? <p className="text-sm text-red-400 mt-1">{errors.title.message}</p> : null}
                </div>
                
                <div>
                    <Label>Price</Label>
                    <Input placeholder="Product price" step="0.02" type="number" {...register("price", {
                        valueAsNumber: true
                    })}/>
                    {errors.price ? <p className="text-sm text-red-400 mt-1">{errors.price.message}</p> : null}
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <Label>Sex</Label>
                        <Select onValueChange={(value) => {
                            setValue("sex", value as "male" | "female" | "unisex")
                        }}>
                        <SelectTrigger className="h-10 border border-input bg-background rounded-sm">
                            Sex: {watch('sex')}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="unisex">Unisex</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.sex ? <p className="text-sm text-red-400 mt-1">{errors.sex.message}</p> : null}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Collection</Label>
                        <Select onValueChange={(value) => {
                            setValue("collection", value as "summer" | "winter")
                        }}>
                        <SelectTrigger className="h-10 border border-input bg-background rounded-sm">
                            Collection: {watch("collection")}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="summer">Summer</SelectItem>
                            <SelectItem value="winter">Winter</SelectItem>
                        </SelectContent>
                        </Select>
                        {errors.collection ? <p className="text-sm text-red-400 mt-1">{errors.collection.message}</p> : null}
                    </div>

                </div>

                <div>
                    <Label>Product Description</Label>
                    <Textarea placeholder="Product description" className="min-h-36" {...register("description")}/>
                    {errors.description ? <p className="text-sm text-red-400 mt-1">{errors.description.message}</p> : null}
                </div>

                <div className="flex gap-10">
                    <div className="w-1/3 flex flex-col">
                        <Label>Sizes</Label>
                        <div className="w-full h-10 flex justify-between items-center">
                            {SIZES.map((item) => {
                                return <div key={item.value}
                                className={cn(" font-semibold cursor-pointer px-2 py-1 rounded-full", {
                                    "bg-slate-300 border border-slate-200 shadow": sizes.includes(item.value)
                                })} onClick={() => handleSizes(item.value)}>{item.label}</div>
                            })}
                        </div>
                        {!sizes.length ? <p className="text-xs font-semibold text-red-400 mt-1">Product must have atleast on size</p> : null}
                    </div>

                    <div className="w-2/3 flex flex-col">
                        <Label>Colors</Label>
                        <div className="w-full h-10 grid grid-cols-11 gap-2 items-center">
                            {COLORS.map((item) => {
                                return <div key={item.value} className={cn("h-8 w-8 rounded-full cursor-pointer shadow", `bg${item.color}`, {
                                    "ring ring-offset-1 ring-emerald-500": colors.includes(item.value)
                                })}
                                onClick={() => handleColors(item.value)}/>
                            })}
                        </div>
                        {!colors.length ? <p className="text-xs font-semibold text-red-400 mt-1">Product must have atleast one color</p> : null}
                    </div>
                </div>

                <div>
                    <Label>Product Images</Label>
                            {/*@ts-ignore*/}
                <UploadButton<OurFileRouter>
                endpoint="imageUploader"
                appearance={{
                    button: {
                        width: "100%"
                    }
                }}
                onClientUploadComplete={(res) => {
        	    toast.success("Upload Completed");
                setImages([...images, res[0].url])
                }}
                onUploadError={(error: Error) => {

                toast.error(`There was an error uploading your image. Please try again.`);
                 }}
                onBeforeUploadBegin={(files) => {
                return files.map(
                (f) => new File([f], "renamed-" + f.name, { type: f.type }),
                );
                    }}
                    onUploadBegin={(name) => {
                console.log("Uploading: ", name);
                }}
                />
                </div>
                <div className="w-full grid grid-cols-4 gap-2 p-2 border border-dashed border-gray-400 min-h-20">
                    {images.length ? images.map((item, index) => {
                        return <div className="aspect-square bg-gray-300 rounded-md relative" key={index} >
                            <Image src={item} fill alt="Uploaded image" />
                        </div>
                    }) : null}

                </div>

                <Button className="w-full mt-4" type="submit">
                    {isLoading ? <Loader2 className="animate-spin" /> : "Save Product"}
                </Button>
            </form>
        </div>
    )
}

export default NewProudctForm