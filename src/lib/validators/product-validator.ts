import { COLORS } from "@/config"
import { number, z } from "zod"


export const ProductValidator = z.object({
    title: z.string().min(3),
    price: z.number().positive(),
    sex: z.enum(['male', 'female', 'unisex']),
    collection: z.enum(['summer', 'winter']),
    sizes: z.array(z.string()).nonempty().optional(),
    colors: z.array(z.string()).nonempty().optional(),
    description: z.string().max(300, "Description must be under 300 characters"),
    images: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    category: z.string()

})

export type TProductValidator = z.infer<typeof ProductValidator>