import express from 'express';

import { createMatch,getAllMatches } from '../controllers/match.js';
import { verifyToken } from '../middleware/verifyUser.js';




const router = express.Router();

router.post("/creatematch",verifyToken ,createMatch)
router.get("/getmatch",verifyToken,getAllMatches)




export default router;
