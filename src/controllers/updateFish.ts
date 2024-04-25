import { updateFishDTOSchema } from "../schemas";
import prisma from "../prisma";
import { Status } from "@prisma/client";

type SafeParseReturnType={
    name: string;
    description: string;
    image: string;
    price: number;
    status: Status
}
const updateFish = async(req,res, next)=>{
    try {
        const { id } = req.params;
        
        const fish = await prisma.fish.findUnique({
            where: {
                id
            }
        })
        
        if(!fish){
            return res.status(404).json({
                code: 404,
                message: "Fish not found"
            })
        }
        const parseBody = updateFishDTOSchema.safeParse(req.body);
        if(!parseBody.success){
            return res.status(400).json({
                code: 400,
                message: parseBody.error.errors
            })
        }

        const updateFish = await prisma.fish.update({
            where: {
                id
            },
            data: {
                name: parseBody.data.name?? fish.name,
                description: parseBody.data.description?? fish.description,
                image: parseBody.data.image?? fish.image,
                price: parseBody.data.price?? fish.price,
                status: parseBody.data.status?? fish.status
            }
        })
        return res.status(200).json({
            code: 200,
            message: "Fish updated successfully",
            data: updateFish
        })
    } catch (error) {
        next(error)
    }
}

export default updateFish;