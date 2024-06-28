import Comment from '../models/comment.js';
import { errorHandler } from '../middleware/error.js';
import User from '../models/user.js';
import { comment } from 'postcss';


export const createComment = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(403, 'You are not allowed to create a comment'));
    }

    const { comment, postId } = req.body;
    const userId = req.user.id;

    // Fetch user details to get username and profile picture
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const { username, profilePicture } = user;

    // Create a new comment
    const newComment = new Comment({
      creatorpiccom: profilePicture,
      creatorcomment: username,
      comment,
      postId,
      userId,
    });

    // Save the new comment to the database
    await newComment.save();

    // Update user's comment count
    user.comments += 1;
    await user.save();

    // Respond with the created comment
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};


export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  if ( req.user.id === req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    
    res.status(200).json({ message: 'The post and its comments have been deleted' });
  } catch (error) {
    next(error);
  }
};