import User from '../models/user.js'; 
import Demande from '../models/demande.js';
import { errorHandler } from '../middleware/error.js';


export const createDemande = async (req, res, next) => {

   
      




  
    const newDemande = new Demande({
      ...req.body,
     


    });
    try {
      const savedDemande = await newDemande.save();
      res.status(201).json(savedDemande);
      next();
    } catch (error) {
      next(error);
    }
  };