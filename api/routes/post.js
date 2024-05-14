import express from 'express';
import { verifyToken } from '../middleware/verifyUser.js';
import { create ,getposts} from '../controllers/post.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', verifyToken,getposts)



export default router;