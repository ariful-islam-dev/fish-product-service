import axios from "axios";
import prisma from "../prisma"
import { NextFunction, Request, Response } from "express"
import { INVENTORY_URL } from "../config";

const deleteFish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const fish = await prisma.fish.findUnique({
            where: {
                id
            }
        })
        if(!fish) { 
            return res.status(404).json({
                code: 404,
                message: "Fish not found",
            })
        }
      if(fish.inventoryId !== null) {
        await axios.delete(`${INVENTORY_URL}/inventories/${fish.inventoryId}`)
      }

       await prisma.fish.delete({
            where: {
                id
            }
        })
        return res.status(200).json({
            code: 200,
            message: "Fish Deleted Successfully",
            data: fish
        })
    } catch (error) {
        next
    }
}

export default deleteFish;