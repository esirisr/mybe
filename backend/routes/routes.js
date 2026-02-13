
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


router.get('/api/services', getServices);


export default router;
