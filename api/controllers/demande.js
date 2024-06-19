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

  export const getdemande = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 15;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const demands = await Demande.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.searchTerm && {
          $or: [
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalDemandes = await Demande.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthDemands = await Demande.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        demands,
        totalDemandes,
        lastMonthDemands,
      });
    } catch (error) {
      next(error);
    } };

    export const deletedemande = async (req, res, next) => {
      if (req.user.role === 'admin' && req.user.id === req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this match'));
      }
      
      try {
        await Demande.findByIdAndDelete(req.params.demandeId);
        res.status(200).json({ message: 'The demande has been deleted' });
      } catch (error) {
        next(error);
      }
    };