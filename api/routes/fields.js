import express from 'express';
import {createF,getfields} from '../controllers/field.js';

const router = express.Router();
router.post("/createf" ,createF)
router.get("/getfield" ,getfields)

export default router;
