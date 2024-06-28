import express from 'express';

import { createMatch,getmatchs, JoinMatchteam1 , deleteMatch,JoinMatchteam2,getAvailableTimeSlots,deletePlayerFromMatch} from '../controllers/match.js';
import { verifyToken } from '../middleware/verifyUser.js';




const router = express.Router();

router.post("/creatematch",verifyToken ,createMatch)
router.get("/getmatch",verifyToken,getmatchs)
router.put('/joinmatch/:matchId', verifyToken, JoinMatchteam1);
router.put('/joinmatch2/:matchId', verifyToken, JoinMatchteam2);
router.get('/availabletimeslots', verifyToken,getAvailableTimeSlots);
router.delete('/deletematch/:matchId', verifyToken, deleteMatch);
router.delete('/deleteplayer/:matchId/:playerId', verifyToken, deletePlayerFromMatch);








export default router;
