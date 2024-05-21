import express from 'express';
import { test, updateUser ,  deleteUser , getusers, create} from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post("/create", verifyToken, create)

router.post("/update/:id", verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/getusers', verifyToken, getusers);




export default router;