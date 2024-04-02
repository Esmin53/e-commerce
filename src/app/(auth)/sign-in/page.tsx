"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/auth-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState<boolean >(false)

    const redirectUrl = searchParams.get("redirectUrl")

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    })
    
    const onSubmit: SubmitHandler<TAuthCredentialsValidator> = async ({username, password}) => {
            setIsLoading(true)
            const res = await signIn("credentials", {username, password, redirect: false})

            setIsLoading(false)
            if(res?.ok) {
                toast.success("Login success!")
                router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${redirectUrl ? redirectUrl : ""}`)
                router.refresh()
            } else {
                toast.error("Login failed! Please enter correct username and password and try again. ")
            }
    } 

    return  <MaxWidthWrapper>
    <div className="flex h-full items-center justify-center w-full flex-1 min-h-[87vh]">
        <Image src='/login.jpg' alt="Login" width={360} height={540} quality={100} className="hidden md:block"/>
        <form className="h-[87vh] max-h-[540px] flex-1 flex flex-col max-w-[540px] md:bg-white p-4 rounded-sm md:shadow md:border-y md:border-r
         md:border-gray-100 md:px-10 lg:px-20" 
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-primary text-lg sm:text-xl font-semibold w-full text-center">Ecommerce</h2>
        <h1 className=" text-xl sm:text-2xl text-gray-900 w-full text-center font-bold mb-6">Wellcome Back</h1>

        <div className="w-full flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col py-2 gap-1 w-full">
                <Label htmlFor="username">Username</Label>
                <Input type="text" placeholder="Your username" {...register("username")}/>
                {errors.username ? <p className="text-xs font-semibold text-red-500">"Please provide valid username"</p> : null}
            </div>
            <div className="flex flex-col py-2 gap-1 w-full">
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder="Your Password" {...register("password")}/>
                {errors.password ? <p className="text-xs font-semibold text-red-500">"Please provide valid password"</p> : null}
            </div>
        </div>

        <Button type="submit" className="w-full mt-auto sm:mt-8 mb-1"
        disabled={isLoading}>
            {isLoading ? (<Loader2 className="animate-spin"/>) : "Sign In"}
        </Button>
        <p className="text-sm ">Dont&apos;t have an account? <Link href={'/sign-up'} 
        className="text-sm text-blue-500">Sign Up.</Link></p>
    </form>
    </div>
</MaxWidthWrapper>
}

export default Page;