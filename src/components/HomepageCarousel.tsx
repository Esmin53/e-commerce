"use client"

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowDownToLine, Earth, Headset, PackageCheck, Shirt, WholeWord } from "lucide-react";

const HomepageCarousel = () => {

    return <div className="w-full flex flex-col gap-3 text-gray-900">
        <Carousel>
            <CarouselContent className=" ">
                <CarouselItem className="w-full h-56 xs:h-72 sm:h-80 md:h-[29rem] relative overflow-hidden">
                    <div className="flex flex-col absolute translate-x-1/2 sm:translate-x-0 right-1/2 sm:right-12 lg:right-38 bottom-2 sm:top-1/2 sm:-translate-y-1/2 z-30 
                    gap-2 sm:gap-4">
                    <p className="text-sm md:text-lg font-medium hidden sm:block">Browse between sweaters, jackets, boots and more</p>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-bold text-wrap">
                            Winter Collection <br />
                            Is Here
                            </h1>
                            <div className="w-full flex justify-end sm:justify-start px-2">
                                <Link href='/products?collection=winter' 
                                className=" px-4 sm:px-6 py-2 rounded-full text-lg font-medium underline underline-offset-1">Shop Now</Link>
                            </div>
                    </div>
                    <Image fill src='/homepage/winter.jpg'  alt="Winter collection" quality={100} className="object-cover object-left-top z-10"/>
                </CarouselItem>
                <CarouselItem className="w-full h-56 xs:h-72 sm:h-80 md:h-[29rem] relative">
                <div className="flex flex-col absolute translate-x-1/2 sm:translate-x-0 right-1/2 sm:right-12 lg:right-38 bottom-2 sm:top-1/2 sm:-translate-y-1/2 z-30 
                    gap-2 sm:gap-4">
                    <p className="text-sm md:text-lg font-medium hidden sm:block">Get ready in style for this summer and check out</p>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-bold text-wrap">
                             Our Summer<br />
                             Collection
                            </h1>
                            <div className="w-full flex justify-end sm:justify-start px-2">
                                <Link href='/products?collection=winter' 
                                className="px-4 sm:px-6 py-2 rounded-full text-lg font-medium underline underline-offset-1">Shop Now</Link>
                            </div>
                    </div>
                <Image fill src='/homepage/summer.jpg'  alt="Summer collection" className="object-cover object-left-top" quality={100}/>
                </CarouselItem>
                <CarouselItem className="w-full h-56 xs:h-72 sm:h-80 md:h-[29rem] relative">
                <div className="flex flex-col absolute -translate-x-1/2 sm:-translate-x-0 left-1/2 sm:left-12 lg:left-38 bottom-2 
                sm:top-44 md:top-64 sm:-translate-y-1/2 z-30 gap-0 sm:gap-4">
                    <p className="text-sm md:text-lg font-medium hidden sm:block">Complete online shopping experience</p>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-bold text-wrap">
                            Completley <br /> Online
                            </h1>
                            <div className="w-full flex justify-end sm:justify-start px-2">
                                <Link href='/products?collection=winter' 
                                className="px-4 sm:px-6 py-2 rounded-full text-lg font-medium underline underline-offset-1">Shop Now</Link>
                            </div>
                    </div>
                <Image fill src='/homepage/girlshoppingcart.jpg'  alt="Summer collection" className="object-cover object-right-top" quality={100}/>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4" variant='ghost'/>
            <CarouselNext className="right-2 sm:right-4" variant='ghost' />
        </Carousel>

        <div className="flex flex-col sm:flex-row w-full gap-3  ">
            <div className="w-full sm:w-1/3 h-52  relative">
                <div className="flex flex-col absolute left-4 sm:left-8 top-1/2 bottom-1/3 z-30  items-center gap-2 font-bold">
                    <h1 className="text-2xl  text-center">
                        For Woman&apos;s
                    </h1>
                    <Link href={'/products?sex=female'} className="text-sm underline"> Shop Now</Link>
                </div>
                <Image alt="Sunglasses collection" fill src='/homepage/girl.jpg' className=" rounded-lg object-cover object-center" />
            </div>
            <div className="w-full sm:w-1/3 h-52  relative">
                <div className="flex flex-col absolute right-4 sm:right-8 top-1/3 bottom-1/3 z-30  items-center gap-2 font-bold">
                    <h1 className="text-2xl  text-center">
                        For Men&apos;s
                    </h1>
                    <Link href={'/products?sex=male'} className="text-sm underline"> Shop Now</Link>
                </div>
                <Image alt="Sunglasses collection" fill src='/homepage/guy.jpg' className="object-cover rounded-lg " />
            </div>
            <div className="w-full sm:w-1/3 h-52  relative">
                <div className="flex flex-col absolute left-4 sm:left-auto sm:right-8 top-1/3 bottom-2/3 z-30  items-center gap-2 font-bold">
                    <h1 className="text-2xl text-center">
                        Unisex <br />
                        Collection
                    </h1>
                    <Link href={'/products?sex=unisex'} className="text-sm underline"> Shop Now</Link>
                </div>
                <Image alt="Sunglasses collection" fill src='/homepage/unisex.jpg' className="object-cover rounded-lg " />
            </div>
        </div>
        <div className="w-full py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 ">
                <div className="flex items-center justify-center">
                    <Shirt  className="md:w-12 w-10 md:h-12 h-10 text-gray-900"/>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl sm:text-normal text-center sm:text-start lg:text-xl font-sembibold">Quality guarantee</h1>
                    <p className="text-sm text-center sm:text-start text-slate-500">Only quality materials</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 ">
                <div className="flex items-center justify-center">
                    <Earth className="md:w-12 w-10 md:h-12 h-10 text-gray-900"/>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl sm:text-normal text-center sm:text-start lg:text-xl font-sembibold">Free shipping</h1>
                    <p className="text-sm text-center sm:text-start text-slate-500">We ship free worldwide</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 ">
                <div className="flex items-center justify-center">
                    <Headset className="md:w-12 w-10 md:h-12 h-10 text-gray-900"/>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl sm:text-normal text-center sm:text-start lg:text-xl font-sembibold">24/7 Support</h1>
                    <p className="text-sm text-center sm:text-start text-slate-500">We support online all days</p>
                </div>
            </div>
        </div>
    </div>
};

export default HomepageCarousel;