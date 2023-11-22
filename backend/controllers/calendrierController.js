import { PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler.js";
import addMonths from "../utils/addMonths.js";

const prisma = new PrismaClient();

function addOneDay(date) {
  date.setDate(date.getDate() + 1);
  return date;
}

const findByDate = asyncHandler(async (req, res, next) => {
  const { date } = req.params;
  const formatDate = new Date(date);
  const a = formatDate.setTime;
  const nextDay = addOneDay(new Date(date));

  console.log(formatDate, nextDay);
  const calendrier = await prisma.calendrier.findMany({
    where: {
      date_paiement: {
        gte: formatDate,
        lt: nextDay,
      },
    },
    include: {
      recette: {
        include: {
          services: true,
        },
      },
      produit: true,
    },
  });

  const produit = await prisma.produit.findMany({
    where: {
      calendrierProduit: {
        some: {
          date_paiement: {
            gte: formatDate,
            lt: nextDay,
          },
        },
      },
    },
    include: {
      calendrierProduit: {
        include: {
          recette: true,
        },
      },
      services: true,
    },
  });

  const tab = [];
  let qte_recu = 0;
  let qte_vendu = 0;

  produit.forEach((prod) => {
    if (prod.calendrierProduit.length > 0) {
      prod.calendrierProduit.forEach((cal) => {
        qte_vendu += cal.recette.qte_vendu;
        qte_recu = cal.recette.qte_recu;
      });
    }

    tab.push({
      id: prod.id,
      design: prod.design,
      pu: prod.pu,
      services: prod.services,
      qte_recu,
      qte_vendu,
      date_paiement: prod.calendrierProduit[0].date_paiement,
    });

    qte_recu = 0;
    qte_vendu = 0;
  });

  res.status(200).json({
    success: true,
    data: calendrier,
    produit: tab,
  });
});

const betweenDates = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.params;
  const calendriers = await prisma.calendrier.findMany({
    where: {
      date_paiement: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });
  res.status(200).json({
    success: true,
    data: calendriers,
  });
});

const findByYear = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);
  const calendriers = await prisma.calendrier.findMany({
    where: {
      date_paiement: {
        gte: firstDay,
        lte: lastDay,
      },
    },
  });
  res.status(200).json({
    success: true,
    data: calendriers,
  });
});

const recetteParMois = asyncHandler(async (req, res, next) => {
  const { year } = req.params;
  let date = new Date(`${year}-01-01T00:00:00.000Z`);
  console.log(date);

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jui",
    "Jul",
    "Aoû",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const tab = [];

  for (let i = 0; i < 12; i++) {
    const month = months[i];
    const date1 = date.toISOString();
    const date2 = addMonths(date, 1).toISOString();

    tab.push({
      mois: month,
      date_debut: date1,
      date_fin: date2,
    });
  }

  const results = [];
  for (let j = 0; j < 12; j++) {
    const recette = await prisma.produit.findMany({
      where: {
        calendrierProduit: {
          some: {
            date_paiement: {
              gte: tab[j].date_debut,
              lt: tab[j].date_fin,
            },
          },
        },
      },
      include: {
        calendrierProduit: {
          include: {
            recette: true,
          },
        },
      },
    });
    results.push({
      mois: months[j],
      recette,
    });
  }

  let tab2 = [];
  let recette_total = 0;
  results.forEach((rec) => {
    if (rec.recette.length > 0) {
      rec.recette.forEach((reci) => {
        if (reci.calendrierProduit.length > 0) {
          reci.calendrierProduit.forEach((cali) => {
            recette_total += reci.pu * cali.recette.qte_vendu;
          });
        }
      });
    }
    tab2.push({
      mois: rec.mois,
      recette: recette_total,
    });
    recette_total = 0;
  });

  const data = tab2.map(item => item.mois)
  const categories = tab2.map(item => item.recette)

  res.status(200).json({data, categories });
});
export { betweenDates, findByDate, findByYear, recetteParMois };
