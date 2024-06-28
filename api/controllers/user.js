import User from '../models/user.js';
import Post from '../models/post.js';
import Match from '../models/match.js';
import Comment from '../models/comment.js';


import { errorHandler } from '../middleware/error.js';
import bcryptjs from 'bcryptjs';
export const test = (req, res) => {
    res.json({
      message: 'API is working!',
    });
  };

  
  export const create = async (req, res, next) => {
    const { username, email, password, role , birthday,phone} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email,role,  birthday,phone,password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
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
            profilePicture: req.body.profilePicture,
            ownerPhone: req.body.phone,
            birthday: req.body.birthday,
            role: req.body.role,
          },
        },
        { new: true }
      );
  
      // Update related collections
      const { username } = req.body;
  
      await Post.updateMany(
        { userId: req.params.id },
        { $set: { creatorpost: username } }
      );
  
      await Match.updateMany(
        { userId: req.params.id },
        { $set: { creatorusername: username } }
      );
  
      await Comment.updateMany(
        { userId: req.params.id },
        { $set: { creatorcomment: username } }
      );
  
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  
 
  
    

  export const getusers = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 15;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const users = await User.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.username && { _id: req.query.username }),
 
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalUsers  = await User.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthUsers = await  User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        users,
        totalUsers ,
        lastMonthUsers ,
      });
    } catch (error) {
      next(error);
    } };


    
    export const deleteUser = async (req, res, next) => {
      if (req.user.role === 'admin' && req.user.id === req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this user'));
      }
      
      try {
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