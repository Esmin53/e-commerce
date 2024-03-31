import { COLORS } from "@/config"
import { number, z } from "zod"


export const ProductValidator = z.object({
    title: z.string().min(3),
    price: z.number().positive(),
    sex: z.enum(['male', 'female', 'unisex']),
    collection: z.enum(['summer', 'winter']),
    sizes: z.array(z.enum(['xs', 's', 'm', 'l', 'xl', 'xxl'])).nonempty().optional(),
    colors: z.array(z.enum(['black', 'white', 'gray', 'lightgray', 'red', 'yellow', 'blue', 'green', 'pink', 'purple', 'orange'])).nonempty().optional(),
    description: z.string().max(300, "Description must be under 300 characters"),
    images: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    category: z.enum(['shirts', 'tshirts', 'pants', 'dresses', 'shoes', 'boots', 'glasses', 'jackets', 'coats', 'sweaters', 'accesories'])

})

export type TProductValidator = z.infer<typeof ProductValidator>