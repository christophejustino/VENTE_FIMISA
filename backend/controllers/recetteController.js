import { PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler.js";

const prisma = new PrismaClient();

function addOneDay(date) {
  date.setDate(date.getDate() + 1);
  return date;
}

const getAllRecette = asyncHandler(async (req, res, next) => {
  try {
    const { skip } = req.params;
    const count = await prisma.recette.count();
    const recettes = await prisma.recette.findMany({
      take: 10,
      skip: Number(skip),
      include: {
        services: true,
        calendrierRecette: {
          include: {
            produit: true,
          },
        },
      },
    });
    res.status(200).json({ recettes, count });
  } catch (error) {
    res.status(500).json(error);
  }
});

const geOneRecette = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const recette = await prisma.recette.findUnique({
      include: {
        services: true,
        calendrierRecette: true,
      },
      where: { id },
    });
    res.status(200).json(recette);
  } catch (error) {
    res.status(500).json(error);
  }
});

const createRecette = asyncHandler(async (req, res, next) => {
  try {
    const { qte_vendu, serviceId, produitId } = req.body;
    const produit = await prisma.produit.findUnique({
      select: {
        qte_stock: true,
      },
      where: {
        id: produitId,
      },
    });

    if (!produit) return res.status(500).json("Produit non trouvé");

    if (qte_vendu > produit.qte_stock)
      return res.status(500).json("Quantité insuffisante");

    const qte_recu = produit.qte_stock - qte_vendu;

    console.log(Date());

    const recettes = await prisma.recette.create({
      data: {
        qte_vendu,
        serviceId,
        qte_recu,
        calendrierRecette: {
          create: {
            produitId,
          },
        },
      },
      include: {
        calendrierRecette: true,
      },
    });

    const updateProduit = await prisma.produit.update({
      where: {
        id: produitId,
      },
      data: {
        qte_stock: qte_recu,
      },
    });

    res.status(200).json(recettes);
  } catch (error) {
    res.status(500).json(error);
  }
});

const deleteRecette = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const recette = await prisma.recette.delete({
      where: { id },
    });
    res.status(200).json(recette);
  } catch (error) {
    res.status(500).json(error);
  }
});
const updateRecette = asyncHandler(async (req, res, next) => {
  try {
    const { qte_vendu } = req.body;
    const id = req.params.id;
    const recette = await prisma.recette.update({
      data: {
        qte_vendu: parseInt(qte_vendu),
      },
      where: { id },
    });
    res.status(200).json(recette);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getProduitByService = asyncHandler(async (req, res, next) => {
  try {
    const { services, date } = req.params;
    const formatDate = new Date(date);
    const a = formatDate.setTime;
    const nextDay = addOneDay(new Date(date));
    if (services === "first") {
      const ser = await prisma.service.findFirst();
      if (!ser) return res.status(404).json({ message: "Service not found" });
      const id = ser.id;
      const recet = await prisma.recette.findMany({
        where: {
          serviceId: id,
          calendrierRecette: {
            some: {
              date_paiement: {
                gte: formatDate,
                lt: nextDay,
              },
            },
          },
        },
        include: {
          services: {
            select: {
              nom_ser: true,
            },
          },
        },
        calendrierRecette: {
          include: {
            produit: {
              select: {
                design: true,
                pu: true,
                qte_stock: true,
              },
            },
          },
        },
      });
      return res.status(201).json(recet);
    }
    const recet = await prisma.recette.findMany({
      where: {
        serviceId: services,
        calendrierRecette: {
          some: {
            date_paiement: {
              gte: formatDate,
              lt: nextDay,
            },
          },
        },
      },
      include: {
        services: {
          select: {
            nom_ser: true,
          },
        },
        calendrierRecette: {
          include: {
            produit: {
              select: {
                design: true,
                pu: true,
                qte_stock: true,
              },
            },
          },
        },
      },
    });
    res.status(201).json(recet);
  } catch (error) {
    res.status(500).json(error);
  }
});

export {
  getAllRecette,
  geOneRecette,
  deleteRecette,
  createRecette,
  updateRecette,
  getProduitByService,
};
