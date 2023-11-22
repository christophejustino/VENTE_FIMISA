import { Router } from "express";
import {geOneRecette, getAllRecette, createRecette, deleteRecette, updateRecette, getProduitByService } from "../controllers/recetteController.js";
// import { protectAdmin } from "../middlewares/protectAdmin";

const recette = Router();
recette.route("/").post(createRecette)
recette.route("/skip/:skip").get(getAllRecette)
recette.route("/:id").get(geOneRecette).delete(deleteRecette).put(updateRecette)
recette.route("/service/:services/:date").get(getProduitByService)


export default recette