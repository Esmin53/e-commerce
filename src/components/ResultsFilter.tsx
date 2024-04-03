"use client"

import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"
import { useRouter, useSearchParams } from "next/navigation"

const ResultsFilter = ({queryString, redirectUrl, totalResults}: {
    queryString: string
    redirectUrl: string
    totalResults: number
    }) => {
    const router = useRouter()
    const params = useSearchParams()

    const currentPage = Number(params.get("page")) || 1



    let filteredQueryString = queryString.split('&').filter((item) => !item.includes("orderBy"))

    let queryParams: string = ""
    filteredQueryString.forEach((item) => {
        queryParams += `${item}&`
    })

    return (
        <div className="w-full px-2 py-0.5 bg-white shadow border border-gray-100 flex justify-between items-center">
        <p className="text-xs sm:text-sm text-gray-900 font-medium">Showing {(currentPage - 1) * 12} - 
        {" "}{currentPage * 12 < totalResults ? currentPage * 12 : totalResults} 
        {" "} out of {totalResults} results</p>
        <Select onValueChange={(value) => {
            router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${redirectUrl}?${queryParams}orderBy=${value}&`)
        }}>
            <SelectTrigger className="flex gap-2 items-center w-fit h-9 border-none">
                <p className="font-medium  text-xs sm:text-sm">Order by: </p>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="alphabetical-asc">Alphabetical a-z</SelectItem>
                <SelectItem value="alphabetical-desc">Alphabetical z-a</SelectItem>
                <SelectItem value="price-asc">Price (lowest)</SelectItem>
                <SelectItem value="price-desc">Price (highest)</SelectItem>
            </SelectContent>
        </Select>  
    </div> 
    )
}

export default ResultsFilter