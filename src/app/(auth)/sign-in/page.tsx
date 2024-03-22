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
import { useRouter } from "next/navigation";

const Page = () => {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    })
    
    const onSubmit: SubmitHandler<TAuthCredentialsValidator> = async ({username, password}) => {

            const res = await signIn("credentials", {username, password, redirect: false})

            if(res?.ok) {
                toast.success("Login success!")
                router.push('/')
                router.refresh()
            } else {
                toast.error("Login failed! Please enter correct username and password and try again. ")
            }
    } 

    return  <MaxWidthWrapper>
    <div className="flex flex-col h-full items-center justify-center w-full flex-1">
        <form className="h-full w-full max-w-96 bg-slate-50 p-4 rounded-sm shadow border border-gray-200" 
        onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-primary text-lg sm:text-xl font-semibold w-full text-center">Ecommerce</h2>
        <h1 className=" text-xl sm:text-2xl text-gray-900 w-full text-center font-bold mb-6">Wellcome Back</h1>
        <div className="flex flex-col py-2 gap-1">
            <Label htmlFor="username">Username</Label>
            <Input type="text" placeholder="Your username" {...register("username")}/>
            {errors.username ? <p className="text-xs font-semibold text-red-500">"Please provide valid username"</p> : null}
        </div>
        <div className="flex flex-col py-2 gap-1">
            <Label htmlFor="password">Password</Label>
            <Input type="password" placeholder="Your Password" {...register("password")}/>
            {errors.password ? <p className="text-xs font-semibold text-red-500">"Please provide valid password"</p> : null}
        </div>

        <Button type="submit" className="w-full mt-4 sm:mt-8 mb-1">Sign up</Button>
        <p className="text-sm ">Dont&apos;t have an account? <Link href={'/sign-up'} 
        className="text-sm text-blue-500">Sign In.</Link></p>
    </form>
    </div>
</MaxWidthWrapper>
}

export default Page;