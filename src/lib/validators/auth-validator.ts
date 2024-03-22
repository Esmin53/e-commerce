import { z } from "zod"

export const AuthCredentialsValidator = z.object({
    username: z.string().min(3, "Your username must contain atleast 3 characters").max(21, "Your username can't be longer than 21 characters!"),
    password: z.string().min(6, "Your password must be between 6 and 21 characters").max(21, "Your password must be between 6 and 21 characters"),
    confirmPassword: z.string().optional()
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>