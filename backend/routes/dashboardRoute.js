import { Router } from "express";
import { dashboardAffiche } from "../controllers/dashboardController.js";


const dashboard = Router();


dashboard.route("/dash").get(dashboardAffiche)


export default dashboard