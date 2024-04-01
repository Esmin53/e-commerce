"use client"

import { products } from "@/db/schema"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import ProductCard from "./ProductCard"

interface SuggestedProps {
    suggested: typeof products.$inferSelect[]
}

const Suggested = ({suggested}: SuggestedProps) => {

    return (
        <div className="w-full">
            <Carousel>
                <CarouselContent>
                    {
                        suggested.map((item) => (
                            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-96">
                                <ProductCard product={item} />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="left-2 sm:left-4" variant='ghost'/>
                <CarouselNext className="right-2 sm:right-4" variant='ghost'/>
            </Carousel>
        </div>
    )
}

export default Suggested