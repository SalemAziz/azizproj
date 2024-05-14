import express from 'express';
import { verifyToken } from '../middleware/verifyUser.js';
import { create } from '../controllers/post.js';

const router = express.Router();

router.post('/create', verifyToken, create)


export default router;