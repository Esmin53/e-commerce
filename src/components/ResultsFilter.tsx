"use client"

import { Check, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const ResultsFilter = ({queryString, redirectUrl, totalResults}: {
    queryString: string
    redirectUrl: string
    totalResults: number
    }) => {
    const router = useRouter()
    const params = useSearchParams()

    const currentPage = Number(params.get("page")) || 1
    const currentOrderBy = params.get("orderBy") || "alphabetical-asc"

    let filteredQueryString = queryString.split('&').filter((item) => !item.includes("orderBy"))

    let queryParams: string = ""
    filteredQueryString.forEach((item) => {
        queryParams += `${item}&`
    })

    const handleOption = (value: string) => {
        router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${redirectUrl}?${queryParams}orderBy=${value}&`)
    }

    return (
        <div className="w-full px-2 py-0.5 bg-white shadow border border-gray-100 flex justify-between items-center">
        <p className="text-xs sm:text-sm text-gray-900 font-medium">Showing {(currentPage - 1) * 12} - 
        {" "}{currentPage * 12 < totalResults ? currentPage * 12 : totalResults} 
        {" "} out of {totalResults} results</p>


        <Popover>
            <PopoverTrigger className="flex items-center justify-center h-10 w-28 gap-2">
                <p className="font-medium text-xs sm:text-sm">Order by: </p>
                <ChevronDown className="text-gray-400 w-4 h-4 my-auto" />
            </PopoverTrigger>
            <PopoverContent className="max-w-fit p-1 text-sm -ml-9">
                <div className={cn("w-full h-7 pr-1 rounded-sm hover:bg-gray-100 hover:shadow-sm mb-1 flex items-center justify-start cursor-pointer gap-1", {
                    "bg-gray-100 shadow-sm": currentOrderBy === "alphabetical-asc" 
                })} onClick={() => handleOption("alphabetical-asc")}>
                    <span className="w-7 h-7 flex items-center justify-center">
                        { currentOrderBy === "alphabetical-asc" ? <Check className="w-5 h-5 text-gray-600" /> : null}
                    </span> Alphabetical a-z</div>
                <div className={cn("w-full h-7 pr-1 rounded-sm hover:bg-gray-100 hover:shadow-sm mb-1 flex items-center justify-start gap-1 cursor-pointer", {
                    "bg-gray-100 shadow-sm": currentOrderBy === "alphabetical-desc" 
                })} onClick={() => handleOption("alphabetical-desc")}>
                    <span className="w-7 h-7 flex items-center justify-center">
                        { currentOrderBy === "alphabetical-desc" ? <Check className="w-5 h-5 text-gray-600" /> : null}
                    </span> Alphabetical z-a</div>
                <div className={cn("w-full h-7 pr-1 rounded-sm hover:bg-gray-100 hover:shadow-sm mb-1 flex items-center justify-start gap-1 cursor-pointer", {
                    "bg-gray-100 shadow-sm": currentOrderBy === "price-asc" 
                })} onClick={() => handleOption("price-asc")}>
                    <span className="w-7 h-7 flex items-center justify-center">
                        { currentOrderBy === "price-asc" ? <Check className="w-5 h-5 text-gray-600" /> : null}
                    </span> price {"(lowest)"}</div>
                <div className={cn("w-full h-7 pr-1 rounded-sm hover:bg-gray-100 hover:shadow-sm mb-1 flex items-center justify-start gap-1 cursor-pointer", {
                    "bg-gray-100 shadow-sm": currentOrderBy === "price-desc" 
                })} onClick={() => handleOption("price-desc")}>
                    <span className="w-7 h-7 flex items-center justify-center">
                        { currentOrderBy === "price-desc" ? <Check className="w-5 h-5 text-gray-600" /> : null}
                    </span> price {"(highest)"}</div>
            </PopoverContent>
        </Popover>
    </div> 
    )
}

export default ResultsFilter