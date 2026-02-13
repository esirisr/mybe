
import express from 'express';
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByProvider
} from '../controllers/serviceController.js';

const router = express.Router();


router.get('/', getServices);


export default router;
