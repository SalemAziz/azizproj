import express from 'express';

import { createMatch,getmatchs, JoinMatchteam1 , deleteMatch,JoinMatchteam2} from '../controllers/match.js';
import { verifyToken } from '../middleware/verifyUser.js';




const router = express.Router();

router.post("/creatematch",verifyToken ,createMatch)
router.get("/getmatch",verifyToken,getmatchs)
router.put('/joinmatch/:matchId', verifyToken, JoinMatchteam1);
router.put('/joinmatch2/:matchId', verifyToken, JoinMatchteam2);

router.delete('/deletematch/:matchId', verifyToken, deleteMatch);







export default router;
