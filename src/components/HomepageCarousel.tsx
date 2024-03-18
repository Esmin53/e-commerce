"use client"

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const HomepageCarousel = () => {

    return <div className="w-full flex flex-col gap-1">
        <Carousel>
            <CarouselContent className="text-white">
                <CarouselItem className="w-full h-48 xs:h-72 sm:h-80 md:h-96 lg:h-[30rem] relative">
                    <div className="flex flex-col absolute right-2 sm:right-12 lg:right-40 top-1/2 -translate-y-1/2 z-30 
                    gap-2 sm:gap-8 items-center">
                        <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-center">
                            Winter Collection <br />
                            Is Here
                            </h1>
                            <p className="text-lg">Shop Now</p>
                    </div>
                    <Image fill src='/winter-collection.jpg'  alt="Winter collection" className=" z-10"/>
                </CarouselItem>
                <CarouselItem className="w-full h-48 xs:h-72 sm:h-80 md:h-96 lg:h-[30rem] relative">
                    <div className="flex flex-col absolute right-2 sm:right-12 lg:right-40 top-1/2 -translate-y-1/2 z-30 
                    gap-2 sm:gap-8 items-center">
                        <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-center">
                            Check out summer <br />
                            collection now
                            </h1>
                            <p className="sm:text-lg">Shop Now</p>
                    </div>
                <Image fill src='/sommer-collection.jpg'  alt="Winter collection" className=""/>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4" variant='ghost'/>
            <CarouselNext className="right-2 sm:right-4" variant='ghost' />
        </Carousel>

        <div className="flex w-full gap-1 text-white">
            <div className="hidden md:block w-1/4 h-56 relative">
            <Image alt="Sunglasses collection" fill src='/onsale.jpg' className="" />
            </div>
            <div className="w-full md:w-2/4  h-36 xs:h-48 sm:h-52 md:h-56 relative">
                <div className="flex flex-col absolute left-6 xs:left-12 top-1/2 -translate-y-1/2 z-30 items-center gap-2 font-bold">
                    <h1 className="text-2xl  text-center">
                        Mens Fashion
                    </h1>
                    <p className="text-sm font-semibold">Shop Now</p>
                </div>
            <Image alt="Sunglasses collection" fill src='/mens-fashion.jpg' className="object-cover" />
            </div>
            <div className="hidden md:block w-1/4 h-56 relative">
            <Image alt="Sunglasses collection" fill src='/shopping-bags.jpg' className="object-cover" />
            </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-1 text-gray-900 ">
            <div className="w-full sm:w-1/2 h-36 xs:h-48 sm:h-52 md:h-60 relative">
                <div className="flex flex-col absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 z-30  items-center gap-2 font-bold">
                    <h1 className="text-2xl  text-center">
                        Eyewear Collection
                    </h1>
                    <p className="text-sm font-semibold">Shop Now</p>
                </div>
                <Image alt="Sunglasses collection" fill src='/sunglasses.jpg' className="object-center" />
            </div>
            <div className="w-full sm:w-1/2 h-36 xs:h-48 sm:h-52 md:h-60 relative">
                <div className="flex flex-col absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 z-30  items-center gap-2 font-bold">
                    <h1 className="text-2xl  text-center">
                        Accesories Collection
                    </h1>
                    <p className="text-sm font-semibold">Shop Now</p>
                </div>
                <Image alt="Sunglasses collection" fill src='/accesories.jpg' className="object-center" />
            </div>
        </div>
    </div>
};

export default HomepageCarousel;