import prisma from "../prisma";
import { NextFunction, Request, Response } from "express"

const getFishById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { id } = req.params;
        const fish = await prisma.fish.findUnique({
            where: {
                id
            }
        });

        if(!fish) {
            return res.status(404).json({
                code: 404,
                message: "Fish not found"
            });
        };
        
        return res.status(200).json({
            code: 200,
            message: "Get Specific Fish",
            data: fish
        })
    } catch (error) {
        next
    }
}

export default getFishById