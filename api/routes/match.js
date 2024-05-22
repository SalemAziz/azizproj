import express from 'express';

import { createMatch,getmatchs, JoinMatch , deleteMatch} from '../controllers/match.js';
import { verifyToken } from '../middleware/verifyUser.js';




const router = express.Router();

router.post("/creatematch",verifyToken ,createMatch)
router.get("/getmatch",verifyToken,getmatchs)
router.put('/joinmatch/:matchId', verifyToken, JoinMatch);
router.delete('/deletematch/:matchId', verifyToken, deleteMatch);







export default router;
