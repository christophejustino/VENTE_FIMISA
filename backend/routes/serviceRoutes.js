import {Router} from 'express';
import validate from '../validator/validate.js';

import {getOneService, serchService, createService, deleteService, updateService, getAllService} from '../controllers/serviceController.js';
// import { protectAdmin } from '../middlewares/protectAdmin';
import serviceSchema from '../schemas/service.schema.js';
const service = Router();

service.route("/").get(getAllService).post(validate(serviceSchema),createService)
service.route("/:id").get(getOneService).delete(deleteService).put(validate(serviceSchema),updateService)
service.route("/search/:search_value").get(serchService)


export default service;