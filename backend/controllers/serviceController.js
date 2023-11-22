import {PrismaClient} from '@prisma/client';
import asyncHandler from "../middlewares/asyncHandler.js";


const prisma = new PrismaClient;


const getAllService  = asyncHandler(async (req, res, next) => {
        const services = await prisma.service.findMany({
           select: {
            id:true,
            nom_ser: true,
            image:true,
            compte: {
                select:{
                    pseudo: true,
                    email: true,
                }
            },
            produits:{
                select:{
                    id:true,
                    design: true,
                    pu: true,
                    qte_stock: true
                }
            },
            recettes:{
                select:{
                    id:true,
                    qte_vendu: true,
                }
            },
           }
        });
        res.status(200).json(services);
   
});

const getOneService = asyncHandler(async (req, res, next) => {
    try {
        const {id} = req.params;
        const services = await prisma.service.findUnique({
             where:{
                 id
             }
        });
        res.status(200).json(services)   ;
    } catch (error) {
        res.status(500).json(error)
    }
});

const createService = asyncHandler(async (req, res, next) => {
    try {
        const { nom_ser, image} = req.body
        const services = await prisma.service.create({
            data: {
                nom_ser,
                image
            }
        });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json("Diso io");
    }
  
});

const deleteService = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const services = await prisma.service.delete({
            where: {id}
        });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json(error);
    }
});

const updateService = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const {nom_ser,image} = req.body;
        const services = await prisma.service.update({
            where:{id},
            data: {
                nom_ser,
                image
            }
        })
        res.status(200).json(services);
        
    } catch (error) {
        res.status(500).json("Error");
    }
});

const serchService = asyncHandler(async (req, res, next) => {
    const search_value = req.params.search_value;
    const search = await prisma.service.findMany({
        where:{
            OR:[
                {nom_ser:{contains: search_value, mode: "insensitive"}}
            ]
        },
        select: {
            id: true,
            nom_ser: true,
            produits:{
                select: {
                    design: true,
                    qte_stock: true
                }
            }
        }
    })
    res.status(200).json(search);
});

export {getOneService,getAllService, serchService, createService, deleteService, updateService};