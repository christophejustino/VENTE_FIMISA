import { PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler.js";
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

import {generateCookie} from "../utils/generateCookie.js";


const prisma = new PrismaClient(); 


const getAllComptes = asyncHandler(async (req, res, next) => {
  try {
    const comptes = await prisma.compte.findMany({
      include:{
        services:true
      }
    });
    res.status(200).json(comptes);
    
  } catch (error) {
    res.status(500).json(error)
  }
});

const getOneCompte = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const comptes = await prisma.compte.findMany({
      where: {
        clerkId: id
      }
    })
    res.status(200).json(comptes)
  } catch (error) {
    res.status(500).json(error)
  }
});

const createAdmin = asyncHandler(async (req, res, next) => {
  try {
    const {pseudo, email, clerkId,image, serviceId} = req.body
      const existePseudo = await prisma.compte.findUnique({
          where:{pseudo}
      });
      const existEmail = await prisma.compte.findUnique({
          where:{email}
      });
      if(existePseudo){
          return  res.status(400).json({message:'Pseudo existe déjà'})
      }
      if(existEmail) return res.status(400).json({message:"EMAIL existe déjà"})

      const comptes = await prisma.compte.create({
        data:{
            pseudo,
            clerkId,
            email,
            serviceId,
            image,
        }
      });
      res.status(200).json(comptes)
  } catch (error) {
    res.status(500).json(error)
  }
})

const deleteCompte = asyncHandler(async (req, res, next) => {
try {
  const comptes = await prisma.compte.delete({
    where :{
      id: req.params.id,
    }
  });
  res.status(200).json(comptes);
} catch (error) {
  res.status(500).json("tena diso");
}
});
const searchCompte  = asyncHandler(async (req, res, next) =>{
  const search_value = req.params.search_value;
  const search = await prisma.compte.findMany({
    where:{
      OR:[
          {pseudo:{contains: search_value, mode: "insensitive"}}
      ]
    }
  })
  res.status(200).json(search)
});

const updateCompte = asyncHandler(async (req, res, next) => {
  try {
    const {pseudo, email, image, serviceId} = req.body;
    const comptes = await prisma.compte.update({
      where: {
        id: req.params.id,
      },
      data:{
        pseudo, 
        email,
        image,
        clerkId,
        serviceId
      }
    });
    res.status(200).json(comptes);
  } catch (error) {
    res.status(500).json("Diso io");
  }
});

const login = asyncHandler(async (req, res, next) => {
try {
  const { email, password } = req.body;

  const existEmail = await prisma.compte.findUnique({
    where: { 
      email 
    },
  });

  if(!existEmail){
    return res.status(404).json({message:"Email invalide", field: "email"})
  }

  const verifyPassword = await bcrypt.compare(password, existEmail.password)

  if(!verifyPassword){
    return res.status(400).json({message:'Mot de passe incorrect', field: "password"});
  }
  const token = jwt.sign({ userId: existEmail.id, type: existEmail.type }, process.env.JWT_SECRET, {
        expiresIn: 3600*24*30,
    });
    generateCookie(res, token);
    res.status(200).json({userId: existEmail.id, token})

} catch (error) {
  res.status(500).send("ERREUR");
}
});

export {
  getAllComptes,
  getOneCompte,
  deleteCompte,
  updateCompte,
  login,
  searchCompte,
  createAdmin,
};
