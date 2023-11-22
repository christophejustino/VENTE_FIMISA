import { Router } from "express";
import {
  getAllComptes,
  getOneCompte,
  deleteCompte,
  updateCompte,
  login,
  searchCompte,
  createAdmin,
} from "../controllers/compteController.js" 

const compte = Router();

compte.route("/")
    .get(getAllComptes)
compte.route("/:id")
    .get(getOneCompte)
    .put(updateCompte)
    .delete(deleteCompte)
compte.route('/login')
    .post(login)
    compte.route("/search/:search_value").get(searchCompte)
compte.route("/")
    .post(createAdmin)

export default compte
