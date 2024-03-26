"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

interface ProductImageSliderProps {
    images: string[]
}

const ProductImageSlider = ({images}: ProductImageSliderProps) => {

    return (
        <Carousel>
            <CarouselContent className="w-full h-full -ml-4">
                {images.map((item, index) => (
                    <CarouselItem className="w-96 h-56 sm:h-[26rem] md:h-[30rem] bg-white pl-4" key={index}>
                        <div className="w-full h-full relative">
                            <Image src={item} alt="Product image" fill className="z-10 w-full object-center"/>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4" variant='ghost'/>
            <CarouselNext className="right-2 sm:right-4" variant='ghost' />
        </Carousel>
    )
}

export default ProductImageSlider;