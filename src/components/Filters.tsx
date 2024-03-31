"use client"

import { AlignVerticalDistributeCenter, ArrowLeftFromLine, ChevronDown } from "lucide-react";
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from "./ui/accordion";
import { CATEGORIES, COLORS, SIZES } from "@/config";
import { Button, buttonVariants } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FiltersProps {
    redirectUrl: string
}

const Filters = ({redirectUrl}: FiltersProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [category, setCategory] = useState<string >(searchParams.get("category") || "")
    const [size, setSize] = useState<string >(searchParams.get("size") || "")
    const [sex, setSex] = useState<string >(searchParams.get("sex") || "")
    const [clr, setClr] = useState<string >(searchParams.get("color") || "")
    const [collection, setCollection] = useState<string>(searchParams.get("collection") || "")
    let orderBy = searchParams.get("orderBy")
    const [hideFilters, setHideFilters] = useState<boolean >(false)

    const handleSex = (s: string) => {
        setSex(sex === s ? "" : s)
    }

    console.log("OrderBy: ", orderBy)

    return (
        <div className="w-full sm:w-1/4 min-w-48 h-fit bg-white sticky top-2 shadow border border-gray-100 flex flex-col p-2 gap-3 z-40">
            <div className="flex w-full items-center gap-2 border-b border-slate-200 shadow-sm pb-1">
                <AlignVerticalDistributeCenter className="w-5 h-5 text-gray-900"/>
                <h1 className="font-bold text-lg text-gray-900 mr-auto">Filters</h1>
                <ChevronDown className="text-gray-900 cursor-pointer w-5 h-5" onClick={() => setHideFilters(prev => !prev)}/>
            </div>
            <div className={cn("flex flex-col w-full gap-3", {
                "hidden": hideFilters
            })}>


            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full flex flex-wrap gap-2">
                            {CATEGORIES.map(({label, value}) => (
                                <div className={cn("p-2 bg-slate-100 shadow-sm border border-gray-100 cursor-pointer rounded-sm", {
                                    "bg-primary text-white": value === category
                                })}
                                key={label} onClick={() => setCategory(value === category ? "" : value)}>{label}</div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full flex flex-wrap gap-2">
                            {SIZES.map(({label, value}) => (
                                <div className={cn("p-2 bg-slate-100 shadow-sm border border-gray-100 cursor-pointer rounded-sm", {
                                    "bg-primary text-white": value === size
                                })} onClick={() => setSize(value === size ? "" : value)} key={value}>{label}</div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger>Sex</AccordionTrigger>
                    <AccordionContent>
                        <div className="w-full flex flex-wrap gap-2">
                            <div className={cn("p-2 bg-slate-100 shadow-sm border border-gray-100 cursor-pointer rounded-sm", {
                                "bg-primary text-white": sex === "male"
                            })}
                            onClick={() => handleSex("male")}>Male</div>
                            <div className={cn("p-2 bg-slate-100 shadow-sm border border-gray-100 cursor-pointer rounded-sm", {
                                "bg-primary text-white": sex === "female"
                            })}
                            onClick={() => handleSex("female")}>Female</div>
                            <div className={cn("p-2 bg-slate-100 shadow-sm border border-gray-100 cursor-pointer rounded-sm", {
                                "bg-primary text-white": sex === "unisex"
                            })}
                            onClick={() => handleSex("unisex")}>Unisex</div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="w-full flex flex-col gap-2">
                <h1 className="font-medium" >Color</h1>
                <div className="flex flex-wrap w-full justify-between gap-2">
                    {COLORS.map(({ value, color}) => (
                        <div key={value} className={`w-7 h-7 rounded-full bg${color} shadow-lg cursor-pointer
                        ${value === clr ? "ring ring-primary ring-offset-1" : ""}`} onClick={() => {
                            setClr(clr === value ? "" : value)
                        }} />
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col gap-2">
                <h1 className="font-medium" >Collection</h1>
                <div className="grid grid-cols-2 w-full  gap-2">
                    <div className={cn("p-2 bg-slate-100 shadow-sm border border-gray-100 cursor-pointer rounded-sm text-center", {
                        "bg-primary text-white": collection === "summer"
                    })} onClick={() => setCollection(collection === "summer" ? "" : "summer")}>Summer</div>
                    <div className={cn("p-2 bg-slate-100 shadow-sm border border-gray-100 cursor-pointer rounded-sm text-center", {
                        "bg-primary text-white": collection === "winter"
                    })} onClick={() => setCollection(collection === "winter" ? "" : "winter")}>Winter</div>
                </div>
            </div>
            <Link  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/${redirectUrl}`} className={buttonVariants({variant: "secondary"})}>Clear all filters</Link>
            <Button onClick={() => {
                router.push('/')
                router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${redirectUrl}?${category.length ? `category=${category}&` : ""}${size.length ? `size=${size}&` : ""}${sex.length ? `sex=${sex}&` : ""}${clr.length ? `color=${clr}&` : ""}${collection.length ? `collection=${collection}&` : ""}${orderBy ? `orderBy=${orderBy}&` : ""}`)
                router.refresh()
            }}>Apply Filters</Button>
            </div>
        </div>
    )
}

export default Filters;