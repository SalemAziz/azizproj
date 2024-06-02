import express from 'express';
import {createF} from '../controllers/field.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();
router.post("/createf" ,verifyToken,createF)
export default router;
