import { errorHandler } from '../middleware/error.js';
import Post from '../models/post.js';

export const create = async (req, res, next) => {
    if (!req.user) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if ( !req.body.content) {
      return next(errorHandler(400, 'Please provide content'));
    }
  
    const newPost = new Post({
      ...req.body,
      userId: req.user.id,
    });
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  };