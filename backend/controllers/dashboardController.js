import { PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler.js";

const prisma = new PrismaClient();

const dashboardAffiche = asyncHandler(async (req, res, next) => {
  const services = await prisma.service.count();
  const recettes = await prisma.recette.count();
  const produits = await prisma.produit.count();

  const prods = await prisma.service.findMany({
    select: {
      nom_ser: true,
      _count: {
        select: {
          produits: true,
          recettes: true,
        },
      },
    },
  });

  const generalStat = [
    {
      tittle: "Nombre des services",
      data: services,
    },
    {
      tittle: "Nombre des recettes",
      data: recettes,
    },
    {
      tittle: "Nombre des produits",
      data: produits,
    },
  ];

  const nbProduits = [];
  const nameServices = [];
  const nbRecettes = [];

  prods.forEach((elem) => {
    nbProduits.push(elem._count.produits);
    nameServices.push(elem.nom_ser);
    nbRecettes.push(elem._count.recettes);
  });

  res.status(200).json({ generalStat, nbProduits, nameServices, nbRecettes });
});

export { dashboardAffiche };
