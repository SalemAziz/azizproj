import { errorHandler } from '../middleware/error.js';
import Field from "../models/field.js";
import User from "../models/user.js";

export const createF = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }

    const { name, location, ownerPhone, ownerName, feesf, workhour, description,ownerEmail } = req.body;ownerEmail

    // Check for required fields
    if (!name || !location || !ownerPhone || !ownerName || !feesf || !workhour || !ownerEmail || !description) {
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

export const getfields = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 15;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const fields = await Field.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.fieldId && { _id: req.query.fieldId }),
      ...(req.query.ownerEmail && { ownerEmail: req.query.ownerEmail }),

    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalFields = await Field.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthFields = await Field.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      fields,
      totalFields,
      lastMonthFields,
    });
  } catch (error) {
    next(error);
  } };

  export const deletefield = async (req, res, next) => {
    if (req.user.role === 'admin' && req.user.id === req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this match'));
    }
    
    try {
      await Field.findByIdAndDelete(req.params.fieldId);
      res.status(200).json({ message: 'The demande has been deleted' });
    } catch (error) {
      next(error);
    }
  };
  export const updateField = async (req, res, next) => {
    if (req.user.role === 'admin' && req.user.id === req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this match'));
    }

  
      const updatedUser = await Field.findByIdAndUpdate(
        req.params.fieldid,
        {
          $set: {
            name: req.body.name,
            location: req.body.location,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
            phone: req.body.phone,
            birthday: req.body.birthday,

          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
  
      next(error);
   
  };