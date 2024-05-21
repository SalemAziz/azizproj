import express from 'express';
import { verifyToken } from '../middleware/verifyUser.js';
import { create ,getposts,deletePost} from '../controllers/post.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', verifyToken,getposts)
router.delete('/deletepost/:postId', verifyToken, deletePost)




export default router;