import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    design: "Mushroom - Enoki, Fresh",
    qte_stock: 9,
    pu: 1712,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Grapes - Red",
    qte_stock: 47,
    pu: 1547,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Basil - Pesto Sauce",
    qte_stock: 57,
    pu: 3092,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Juice - Orangina",
    qte_stock: 282,
    pu: 517,
    serviceId: "6523c3c9297109fb8cbd5769",
  },
  {
    design: "Pepper - Yellow Bell",
    qte_stock: 170,
    pu: 828,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Sage - Rubbed",
    qte_stock: 340,
    pu: 3372,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Chicken - Leg, Fresh",
    qte_stock: 278,
    pu: 2739,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Coke - Classic, 355 Ml",
    qte_stock: 318,
    pu: 2295,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Cream - 18%",
    qte_stock: 379,
    pu: 3751,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Bar Special K",
    qte_stock: 392,
    pu: 1669,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Pasta - Rotini, Colour, Dry",
    qte_stock: 151,
    pu: 4478,
    serviceId: "6523c3c9297109fb8cbd5769",
  },
  {
    design: "Beef - Baby, Liver",
    qte_stock: 228,
    pu: 4485,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Pepperoni Slices",
    qte_stock: 453,
    pu: 3314,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Carrots - Mini Red Organic",
    qte_stock: 292,
    pu: 1934,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Wine - Sogrape Mateus Rose",
    qte_stock: 470,
    pu: 3398,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Fish - Base, Bouillion",
    qte_stock: 475,
    pu: 1444,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Soup - Campbells Asian Noodle",
    qte_stock: 346,
    pu: 2945,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Wine - White, Riesling, Henry Of",
    qte_stock: 113,
    pu: 419,
    serviceId: "6523c3c9297109fb8cbd5769",
  },
  {
    design: "Tea - Jasmin Green",
    qte_stock: 180,
    pu: 3696,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Steam Pan Full Lid",
    qte_stock: 239,
    pu: 3227,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Mace",
    qte_stock: 259,
    pu: 3028,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Sherbet - Raspberry",
    qte_stock: 288,
    pu: 3577,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Garbage Bags - Black",
    qte_stock: 173,
    pu: 2236,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Clam Nectar",
    qte_stock: 483,
    pu: 1203,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Table Cloth 53x53 White",
    qte_stock: 199,
    pu: 750,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Blouse / Shirt / Sweater",
    qte_stock: 92,
    pu: 3804,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Tea - Decaf Lipton",
    qte_stock: 176,
    pu: 521,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Cheese - Cheddarsliced",
    qte_stock: 43,
    pu: 3816,
    serviceId: "6523c3c9297109fb8cbd5769",
  },
  {
    design: "Bread - English Muffin",
    qte_stock: 220,
    pu: 3432,
    serviceId: "6523c3c9297109fb8cbd5769",
  },
  {
    design: "Soup Campbells Mexicali Tortilla",
    qte_stock: 160,
    pu: 718,
    serviceId: "6523c3c9297109fb8cbd5769",
  },
  {
    design: "Wine - Baron De Rothschild",
    qte_stock: 226,
    pu: 2326,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Coffee - Frthy Coffee Crisp",
    qte_stock: 262,
    pu: 3851,
    serviceId: "6523c3c9297109fb8cbd5769",
  },
  {
    design: "Apple - Custard",
    qte_stock: 174,
    pu: 599,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Island Oasis - Magarita Mix",
    qte_stock: 102,
    pu: 1281,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Sprouts - Corn",
    qte_stock: 228,
    pu: 2177,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Beef - Tender Tips",
    qte_stock: 94,
    pu: 316,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Energy Drink - Franks Original",
    qte_stock: 258,
    pu: 4791,
    serviceId: "6523c3c9297109fb8cbd5769",
  },
  {
    design: "Cup - 6oz, Foam",
    qte_stock: 469,
    pu: 4987,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Compound - Mocha",
    qte_stock: 253,
    pu: 332,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Cheese - Le Cru Du Clocher",
    qte_stock: 338,
    pu: 3350,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Ecolab - Mikroklene 4/4 L",
    qte_stock: 331,
    pu: 3971,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Raspberries - Fresh",
    qte_stock: 180,
    pu: 1836,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Juice - Orange, 341 Ml",
    qte_stock: 180,
    pu: 1992,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Spinach - Spinach Leaf",
    qte_stock: 18,
    pu: 1995,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Tea - Herbal Sweet Dreams",
    qte_stock: 72,
    pu: 2606,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Soup - French Can Pea",
    qte_stock: 104,
    pu: 4026,
    serviceId: "6523d087297109fb8cbd5773",
  },
  {
    design: "Mace Ground",
    qte_stock: 443,
    pu: 3044,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Tart - Lemon",
    qte_stock: 126,
    pu: 3908,
    serviceId: "6523cfec297109fb8cbd5772",
  },
  {
    design: "Gloves - Goldtouch Disposable",
    qte_stock: 19,
    pu: 1515,
    serviceId: "6523cdf2297109fb8cbd5770",
  },
  {
    design: "Ham - Proscuitto",
    qte_stock: 193,
    pu: 4817,
    serviceId: "6523cfec297109fb8cbd5772",
  },
];

async function main() {
  const add = await prisma.produit.createMany({
    data: [...data],
  });

  /* const ids = await prisma.service.findMany({
    select: {
      id: true,
    },
  }); */

  console.log(add);
}

main();
