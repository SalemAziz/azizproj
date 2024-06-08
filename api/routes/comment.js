import express from 'express';
import {createComment ,getPostComments} from '../controllers/comment.js';
import { verifyToken } from '../middleware/verifyUser.js';



const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);



export default router;