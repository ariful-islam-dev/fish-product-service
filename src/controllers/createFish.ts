import { INVENTORY_URL } from "../config";
import prisma from "../prisma";
import { createFishDTOSchema } from "../schemas"
import axios from "axios";
import { NextFunction, Request, Response } from "express"

const createFish = async (req: Request, res: Response, next: NextFunction) => {
    try {
       // Validate request body
       const parseBody = createFishDTOSchema.safeParse(req.body);
       if (!parseBody.success) {
        return res.status(400).json({
            code: 400,
            message: parseBody.error.errors
        })
       }

       // check if product with the same sku already exists
       const existingFish = await prisma.fish.findUnique({
          where: {
              sku: parseBody.data.sku
          } 
       })

       if(existingFish){
        return res.status(400).json({
            code: 400,
            message: "Fish with the same sku already exists"
        })
       }

       // create fish Product
       const fish = await prisma.fish.create({
           data: {
               name: parseBody.data.name,
               sku: parseBody.data.sku,
               description: parseBody.data.description,
               image: parseBody.data.image,
               price: parseBody.data.price
           }
       })

       // create Inventory record for the fish
       const {data: inventory} = await axios.post(
        `${INVENTORY_URL}/inventories`,{ 
            productId: fish.id,
            sku: fish.sku,
            quantity: 0
        }
        )
        // update fish and store inventory
        await prisma.fish.update({
            where: {
                id: fish.id
            },
            data: {
                inventoryId: inventory.data.id
            }
        })

        res.status(201).json({
            code: 201,
            message: "Fish created successfully",
            data: {
                ...fish,
                inventoryId: inventory.data.id
            }
        })
    } catch (error) {
        next(error)
    }
};

export default createFish;