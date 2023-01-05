import express from "express";
import {
    getMaintenances,
    getMaintenanceById,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
} from "../controllers/Maintenances.js";

const router = express.Router();
router.get('/maintenances', getMaintenances);
router.get('/maintenances/:id',  getMaintenanceById);
router.post('/maintenances',  createMaintenance) ;
router.patch('/maintenances/:id', updateMaintenance);
router.delete('/maintenances/:id',  deleteMaintenance);
export default router;