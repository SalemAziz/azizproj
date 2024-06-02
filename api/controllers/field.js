import { errorHandler } from '../middleware/error.js';
import Field from "../models/field.js";
import User from "../models/user.js";

export const createF = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }

    const { name, location, ownerPhone, ownerName, feesf, workhour, description } = req.body;

    // Check for required fields
    if (!name || !location || !ownerPhone || !ownerName || !feesf || !workhour || !description) {
      return next(errorHandler(400, 'Please provide all required fields: name, location, ownerPhone, ownerName, feesf, workhour, and description'));
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    
    const newField = new Field({
      ...req.body,
      userId: userId,
      adminFieldAdder: user.username, 
    });

    const savedField = await newField.save();
    res.status(201).json({
      success: true,
      data: savedField,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
