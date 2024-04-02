"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/auth-validator";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const Page = () => {
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean >(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    })

    useEffect(() => {
        if(watch("password") !== watch("confirmPassword")) {
            setConfirmPasswordError(true)
        } else {
            setConfirmPasswordError(false)
        }
    }, [watch("confirmPassword")])

    const onSubmit: SubmitHandler<TAuthCredentialsValidator> = async ({username, password, confirmPassword}) => {
        try {
            setIsLoading(true)
            if(!username || !password) {
                toast.error("Please fill all required fields!")
                return
            }
            if(username.length < 3 || username.length > 21) {
                toast.error("Username must be between 3 and 21 characters!")
                return
            }
            if(password.length < 6 || password.length > 21) {
                toast.error("Password must be between 6 and 21 characters!") 
                return
            }
            if(password !== confirmPassword) {
                setConfirmPasswordError(true)
                toast.error("Password and confirm password fields must match!")
                return
            } 

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sign-up`, {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password
                })
            })

            const data = await response.json()

            if(data?.success === false) {
                toast.error(data?.message)
            }
            if(data?.success === true) {
                toast.success("Account created successfully. Please sign in.")
                router.push("/sign-in")
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            if(error instanceof ZodError) {
                toast.error("Please provide all required information.")
            } else {
                toast.error("There was an error creating your account, please try again later.")
            }
        }
    }

    return (
        <MaxWidthWrapper>
            <div className="flex h-full items-center justify-center w-full flex-1 min-h-[87vh]">
                <form className="h-[87vh] max-h-[540px] flex-1 flex flex-col max-w-[540px] md:bg-white p-4 rounded-sm md:shadow md:border-y md:border-r
         md:border-gray-100 md:px-10 lg:px-20" 
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-primary text-lg sm:text-xl font-semibold w-full text-center">Ecommerce</h2>
                <h1 className=" text-xl sm:text-2xl text-gray-900 w-full text-center font-bold mb-6">Create An Account</h1>
                <div className="flex flex-col py-2 gap-1">
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" placeholder="Your username" {...register("username")}/>
                    {errors.username ? <p className="text-xs font-semibold text-red-500">{errors?.username?.message}</p> : null}
                </div>
                <div className="flex flex-col py-2 gap-1">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" placeholder="Your Password" {...register("password")}/>
                    {errors.password ? <p className="text-xs font-semibold text-red-500">{errors?.password?.message}</p> : null}
                </div>
                <div className="flex flex-col py-2 gap-1">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input type="password" placeholder="Confirm password" {...register("confirmPassword")}/>
                    {confirmPasswordError ? <p className="text-xs font-semibold text-red-500">Confirm password and password fields must match.</p> : null}
                </div>
                <Button type="submit" className="w-full mt-4 sm:mt-8 mb-1" disabled={isLoading}>
                {isLoading ? (<Loader2 className="animate-spin"/>) : "Sign Up"}
                </Button>
                <p className="text-sm ">Already an user? <Link href={'/sign-in'} 
                className="text-sm text-blue-500">Sign in?</Link></p>
                <p className="text-xs mt-6">By continuing, you agree to our Conditions of Use and Privacy Notice.</p>
            </form>
            <Image src='/register.jpg' alt="Login" width={360} height={540} quality={100} className="hidden md:block object-cover"/>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page;