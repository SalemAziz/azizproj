import express from 'express';
import {createF,getfields,deletefield} from '../controllers/field.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();
router.post("/createf" ,verifyToken,createF)
router.get("/getfield" ,getfields)
router.delete("/deletefield/:fieldId" ,verifyToken,deletefield)


export default router;
