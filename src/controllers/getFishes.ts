import { query } from "@/utils";
import prisma from "../prisma";
import { NextFunction, Request, Response } from "express";

const getFishes = async(req:Request, res: Response, next:NextFunction)=>{
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const sortType = req.query.sortType ? req.query.sortType as string : "desc";
    const sortBy = req.query.sortBy ? req.query.sortBy as string : "createdAt";
    const search = req.query.search ? req.query.search as string : "";
   
    try{
        const fish = await prisma.fish.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                name: {
                    contains: search
                }
            },
            orderBy: {
                [sortBy]: sortType
            },
            
        });

        const data = query.getTransformItems(fish,
            ["id","name", "sku", "description", "image", "price", "status", "inventoryId"],
            "/fishes"
        )

        // pagination
        const totalItems = await prisma.fish.count();
        const pagination = query.getPagination(totalItems, page, limit);

        // links
        const links = query.getHateOsLinks(req.url,!!pagination["next"], !!pagination["prev"], req.path, req.query, page )
        return res.status(200).json({
            code: 200,
            message: 'Get All Fishes',
            data,
            pagination,
            links
        })
    }catch(err){
        next(err)
    }
}

export default getFishes