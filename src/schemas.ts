import {z} from "zod";
import { Status } from "@prisma/client";

export const createFishDTOSchema = z.object({
    name: z.string(),
    sku: z.string(),
    description: z.string().optional().default(""),
    image: z.string().optional().default(""),
    price: z.number().optional().default(0),
    status: z.string().optional().default(Status.DRAFT) 
})

