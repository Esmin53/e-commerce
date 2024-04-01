"use client"

import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/auth-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Link from "next/link"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { ZodError } from "zod"

const NewAdminForm = () => {
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean >(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    })

    const onSubmit: SubmitHandler<TAuthCredentialsValidator> = async ({username, password, confirmPassword}) => {
        setIsLoading(true)
        try {
            if(password !== confirmPassword) {
                setConfirmPasswordError(true)
                toast.error("Password and confirm password fields must match!")
                setIsLoading(false)
                return
            } 

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sign-up`, {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password,
                    isAdmin: true
                })
            })

            const data = await response.json()

            if(data?.success === false) {
                toast.error(data?.message)
            }
            if(data?.success === true) {
                toast.success("New admin user created successfully.")
            }
            setIsLoading(false)
        } catch (error) {
            if(error instanceof ZodError) {
                toast.error("Please provide all required information.")
            } else {
                toast.error("There was an error creating your account, please try again later.")
            }
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(watch("password") !== watch("confirmPassword")) {
            setConfirmPasswordError(true)
        } else {
            setConfirmPasswordError(false)
        }
    }, [watch("confirmPassword")])

    return (
        <div className="bg-white shadow border border-slate-200 rounded-sm p-2">
            <h1 className="text-xl font-medium text-gray-900 pb-1 border-b border-slate-200">Create new admin</h1>
            <form className="h-full w-full " 
                onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit" className="w-full mt-4 sm:mt-8 mb-1">Sign up</Button>
            </form>
        </div>
    )
}

export default NewAdminForm;