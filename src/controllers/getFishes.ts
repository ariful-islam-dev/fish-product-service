import prisma from "../prisma";
import { NextFunction, Request, Response } from "express";

const getFishes = async(req:Request, res: Response, next:NextFunction)=>{
    try{
        const fish = await prisma.fish.findMany();
        return res.status(200).json({
            code: 200,
            message: 'Get All Fishes',
            data: fish
        })
    }catch(err){
        next(err)
    }
}

export default getFishes