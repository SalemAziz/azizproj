import User from '../models/user.js'; 
import Demande from '../models/demande.js';
import { errorHandler } from '../middleware/error.js';


export const createDemande = async (req, res, next) => {
    if (!req.user) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
   
      


 const userId = req.user.id;


  
    const newDemande = new Demande({
      ...req.body,
      owner: req.user.id,
     


    });
    try {
      const savedDemande = await newDemande.save();
      res.status(201).json(savedDemande);
      next();
    } catch (error) {
      next(error);
    }
  };