import User from '../models/user.js';
import Post from '../models/post.js';
import Match from '../models/match.js';


import { errorHandler } from '../middleware/error.js';
import bcryptjs from 'bcryptjs';
export const test = (req, res) => {
    res.json({
      message: 'API is working!',
    });
  };

  export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const deleteUser = async (req, res, next) => {
    try {
      if (String(req.user.id) !== String(req.params.id)) {
        return next(errorHandler(401, 'You can delete only your account!'));
      }
  
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return next(errorHandler(404, 'User not found!'));
      }
  
      const deleteResult = await Post.deleteMany({ userId: req.params.id });
  
   
      console.log(`Deleted ${deleteResult.deletedCount} posts associated with user ${req.params.id}`);

      const deleteMatch = await Match.deleteMany({ creator: req.params.id });

      console.log(`Deleted ${deleteMatch.deletedCount} posts associated with user ${req.params.id}`);

  
      res.status(200).json({ message: 'User and associated posts have been deleted...' });
    } catch (error) {
      console.error(`Error deleting user and posts: ${error.message}`);
      next(error);
    }
  };