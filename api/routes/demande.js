import express from 'express';
import {createDemande} from '../controllers/demande.js';


const router = express.Router();

router.post("/createdemande" ,createDemande)

export default router;