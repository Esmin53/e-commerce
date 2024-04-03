"use client"

import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalResults: number,
    queryString: string,
    redirectUrl: string
}

const Pagination = ({ totalResults, queryString, redirectUrl }: PaginationProps) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    let filteredQueryString = queryString.split('&').filter((item) => !item.includes("page"))

    let queryParams: string = ""
    filteredQueryString.forEach((item) => {
        queryParams += `${item}&`
    })

    const currentPage = Number(searchParams.get("page")) || 1

    let totalPages = Math.ceil(totalResults / 12)

    const handlePage = (pageNum: number) => {
        if(pageNum === 0) {
            return
        }

        router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${redirectUrl}?${queryParams}page=${pageNum}`)
    }

    return (
        <div className="w-full flex justify-center absolute bottom-2">
            <div className="flex gap-2">
                <div className="w-10 h-10 bg-primary flex justify-center items-center text-white cursor-pointer shadow" 
                onClick={() => handlePage(currentPage - 1)}>
                    <ChevronLeft />
                </div>
                {currentPage - 1 !== 1 && currentPage !==  1 ? <div className="flex gap-1 items-end">
                        <div className="w-10 h-10 bg-white flex justify-center items-center text-primary cursor-pointer shadow font-medium"
                        onClick={() => handlePage(1)}>
                            1
                        </div>
                        <div className="flex items-end">
                            <Dot />
                            <Dot />
                            <Dot />
                        </div>
                    </div> : null}
                {currentPage - 1 > 0 ? (
                    <div className="w-10 h-10 bg-white flex justify-center items-center text-primary cursor-pointer shadow font-medium"
                    onClick={() => handlePage(currentPage - 1)}>
                        {currentPage - 1}
                    </div>
                ) : null}
                <div className="w-10 h-10 bg-primary text-white flex justify-center items-center text-primary cursor-pointer shadow font-medium">
                    {currentPage}
                </div>
                {currentPage + 1 <= totalPages ? (
                    <div className="w-10 h-10 bg-white flex justify-center items-center text-primary cursor-pointer shadow font-medium"
                    onClick={() => handlePage(currentPage + 1)}>
                        {currentPage + 1}
                    </div>
                ) : null}
                    {currentPage + 1 < totalPages && currentPage !== totalPages ? <div className="flex gap-1 items-end">
                        <div className="flex items-end">
                            <Dot />
                            <Dot />
                            <Dot />
                        </div>
                        <div className="w-10 h-10 bg-white flex justify-center items-center text-primary cursor-pointer shadow font-medium"
                        onClick={() => handlePage(totalPages)}>
                            {totalPages}
                        </div>
                    </div> : null}

                <div className="w-10 h-10 bg-primary flex justify-center items-center text-white cursor-pointer shadow">
                    <ChevronRight onClick={() => handlePage(currentPage + 1)} />
                </div>
            </div>
        </div>
    )
}

export default Pagination;