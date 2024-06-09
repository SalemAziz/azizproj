import express from 'express';
import {createComment ,getPostComments,likeComment} from '../controllers/comment.js';
import { verifyToken } from '../middleware/verifyUser.js';



const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId',verifyToken ,getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);




export default router;