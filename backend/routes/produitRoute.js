import { Router } from "express";
import {
  getAllProduit,
  getOneProduit,
  getToutProduit,
  getProduitByService,
  createProduit,
  deleteProduit,
  updateProduit,
  most,
} from "../controllers/produitController.js";
// import { protectAdmin } from "../middlewares/protectAdmin";

const produit = Router();

produit.route("/").get(getToutProduit).post(createProduit);
produit.route("/search/:search_value/skip/:skip").get(getAllProduit);
produit
  .route("/:id")
  .get(getOneProduit)
  .delete(deleteProduit)
  .put(updateProduit);
produit.route("/service/:services/skip/:skip").get(getProduitByService);
produit.route("/most/vendus").get(most)

export default produit;
