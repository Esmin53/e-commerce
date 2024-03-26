"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

interface CardImageSliderProps {
    images: string[]
}

const CardImageSlider = ({images}: CardImageSliderProps) => {

    return (
        <div className="w-full bg-red-200">
        <Carousel className="w-full flex justify-center ">
            <CarouselContent className="w-full h-full ">
                {images.map((item, index) => (
                    <CarouselItem className="w-full  h-60 min-w-60 relative bg-white" key={index}>
                        <Image src={item} alt="Product image" fill className="z-10 w-full"/>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4" variant='ghost'/>
            <CarouselNext className="right-2 sm:right-4" variant='ghost' />
        </Carousel>
        </div>
    )
}

export default CardImageSlider;