import { errorHandler } from '../middleware/error.js';
import Post from '../models/post.js';
import User from '../models/user.js';


export const create = async (req, res, next) => {
    if (!req.user) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if ( !req.body.content) {
      return next(errorHandler(400, 'Please provide content'));
    }


 const userId = req.user.id;

    // Retrieve user details
    const user = await User.findById(userId);
    const username = user.username;
    const userprof = user.profilePicture;

  
    const newPost = new Post({
      ...req.body,
      userId: req.user.id,
      creatorpost: username,
      creatorpic: userprof,
     


    });
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
      next();
    } catch (error) {
      next(error);
    }
  };

  export const getposts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalPosts = await Post.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      });
    } catch (error) {
      next(error);
    } };

    export const deletePost = async (req, res, next) => {
      if (req.user.role === 'admin' && req.user.id === req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
      }
      
      try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({ message: 'The post has been deleted' });
      } catch (error) {
        next(error);
      }
    };
    