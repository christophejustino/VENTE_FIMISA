import { PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler.js";

const prisma = new PrismaClient();

const getToutProduit = asyncHandler(async (req, res, next) => {
  try {
    const produits = await prisma.produit.findMany({
      include: {
        services: true,
      },
    });
    res.status(200).json(produits);
  } catch (error) {
    res.status(400).json(error);
  }
});

const getAllProduit = asyncHandler(async (req, res, next) => {
  try {
    const { search_value, skip } = req.params;
    if (search_value === "%20" || search_value === " ") {
      const count = await prisma.produit.count();
      const produits = await prisma.produit.findMany({
        take: 10,
        skip: Number(skip),
        include: {
          services: true,
        },
      });
      return res.status(200).json({ produits, count });
    }
    const count = await prisma.produit.count({
      where: {
        OR: [
          {
            design: {
              contains: search_value,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const produits = await prisma.produit.findMany({
      take: 10,
      skip: Number(skip),
      include: {
        services: true,
      },
      where: {
        OR: [
          {
            design: {
              contains: search_value,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    res.status(200).json({ produits, count });
  } catch (error) {
    res.status(400).json(error);
  }
});
const getOneProduit = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const produits = await prisma.produit.findUnique({
      include: {
        services: true,
      },
      where: {
        id,
      },
    });
    res.status(200).json(produits);
  } catch (error) {
    res.status(400).json(error);
  }
});
const createProduit = asyncHandler(async (req, res, next) => {
  try {
    const { design, pu, qte_stock, serviceId } = req.body;
    const produits = await prisma.produit.create({
      data: {
        design,
        pu:Number(pu),
        qte_stock: parseInt(qte_stock),
        serviceId,
      },
    });
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json(error);
  }
});
const deleteProduit = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const produits = await prisma.produit.delete({
      where: {
        id,
      },
    });
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json(error);
  }
});
const updateProduit = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { design, pu, qte_stock, serviceId } = req.body;
    const produits = await prisma.produit.update({
      data: {
        design,
        pu: Number(pu),
        qte_stock: parseInt(qte_stock),
        serviceId,
      },
      where: {
        id,
      },
    });
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json(error);
  }
});

const searchProduit = asyncHandler(async (req, res, next) => {
  try {
    const search_value = req.params.search_value;
    const search = await prisma.produit.findMany({
      where: {
        OR: [
          { design: { contains: search_value, mode: "insensitive" } },
          { pu: { contains: search_value, mode: "default" } },
        ],
      },
    });
    res.status(200).json(search);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getProduitByService = asyncHandler(async (req, res, next) => {
  try {
    const { services, skip } = req.params;
    if (services === "first") {
      const ser = await prisma.service.findFirst();
      if (!ser) return res.status(404).json({ message: "Service not found" });

      const id = ser.id;
      const count = await prisma.produit.count({
        where: {
          serviceId: id,
        },
      });
      const prods = await prisma.produit.findMany({
        take: 10,
        skip: Number(skip),
        where: {
          serviceId: id,
        },
        include: {
          services: {
            select: {
              nom_ser: true,
            },
          },
        },
      });
      return res.status(201).json({ prods, count });
    }

    const count = await prisma.produit.count({
      where: {
        serviceId: services,
      },
    });

    const prods = await prisma.produit.findMany({
      take: 10,
      skip: Number(skip),
      where: {
        serviceId: services,
      },
      include: {
        services: {
          select: {
            nom_ser: true,
          },
        },
      },
    });
    res.status(201).json({ prods, count });
  } catch (error) {
    res.status(500).json(error);
  }
});

const most = asyncHandler(async (req, res, next) => {
  const prods = await prisma.produit.findMany({
    include: {
      calendrierProduit: {
        include: {
          recette: true,
        },
      },
    },
  });

  const filteredTab = [];
  let a = 0;
  prods.forEach((p) => {
    if (p.calendrierProduit.length > 0) {
      p.calendrierProduit.forEach((cal) => {
        a += cal.recette.qte_vendu;
      });
    }


    filteredTab.push({
      design: p.design,
      qte_vendu: a,
    });
    a = 0;
  });

  let max = filteredTab[0].qte_vendu;
  let design = filteredTab[0].design;

  filteredTab.forEach((f) => {
    if (f.qte_vendu >= max) {
      max = f.qte_vendu;
      design = f.design;
    }
  });

  res.status(200).json({ max, design });
});

export {
  getAllProduit,
  getOneProduit,
  searchProduit,
  createProduit,
  deleteProduit,
  updateProduit,
  getToutProduit,
  getProduitByService,
  most,
};
