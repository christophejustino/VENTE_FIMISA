import { Router } from "express";
import {
  betweenDates,
  findByDate,
  findByYear,
  recetteParMois,
} from "../controllers/calendrierController.js";

const calendrier = Router();

calendrier.route("/:date").get(findByDate);
calendrier.route("/:startDate/:endDate").get(betweenDates);
calendrier.route("/year/:year").get(findByYear);
calendrier.get("/get/recette/:year", recetteParMois);

export default calendrier;
