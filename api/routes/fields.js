import express from 'express';
import {createF,getfields} from '../controllers/field.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();
router.post("/createf" ,verifyToken,createF)
router.get("/getfield" ,verifyToken,getfields)

export default router;
