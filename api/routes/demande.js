import express from 'express';
import {createDemande} from '../controllers/demande.js';
import { verifyToken } from '../middleware/verifyUser.js';


const router = express.Router();

router.post("/createdemande",verifyToken ,createDemande)

export default router;