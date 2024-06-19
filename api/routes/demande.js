import express from 'express';
import {createDemande,  getdemande,deletedemande} from '../controllers/demande.js';
import { verifyToken } from '../middleware/verifyUser.js';


const router = express.Router();

router.post("/createdemande" ,createDemande)
router.get("/getdemande" ,getdemande)
router.delete("/delete/:demandeId" ,verifyToken,deletedemande)


export default router;