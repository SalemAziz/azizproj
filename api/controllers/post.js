import { errorHandler } from '../middleware/error.js';
import Post from '../models/post.js';
import User from '../models/user.js';
import Comment from '../models/comment.js';


export const create = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.content) {
      return next(errorHandler(400, 'Please provide content'));
    }

    const userId = req.user.id;

    // Fetch user details to get username and profile picture
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const { username, profilePicture } = user;

    // Create a new post
    const newPost = new Post({
      ...req.body,
      userId: req.user.id,
      creatorpost: username,
      creatorpic: profilePicture,
    });

    // Save the new post to the database
    const savedPost = await newPost.save();

    // Update user's posts count
    user.posts += 1;
    await user.save();

    // Respond with the created post
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
  export const getposts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 15;
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
      if ( req.user.id === req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
      }
      
      try {
        const post = await Post.findByIdAndDelete(req.params.postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        
        await Comment.deleteMany({ postId: req.params.postId });
        
        res.status(200).json({ message: 'The post and its comments have been deleted' });
      } catch (error) {
        next(error);
      }
    };
    
    export const likePost = async (req, res, next) => {
      try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
          return next(errorHandler(404, 'Comment not found'));
        }
        const userIndex = post.likes.indexOf(req.user.id);
        if (userIndex === -1) {
          post.numberOfLikes += 1;
          post.likes.push(req.user.id);
        } else {
          post.numberOfLikes -= 1;
          post.likes.splice(userIndex, 1);
        }
        await post.save();
        res.status(200).json(post);
      } catch (error) {
        next(error);
      }
    };