import Comment from '../models/comment.js';
import { errorHandler } from '../middleware/error.js';
import User from '../models/user.js';


export const createComment = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    const { comment, postId } = req.body;

 
    const userId = req.user.id;

    const user = await User.findById(userId);
    const username = user.username;
    const userprof = user.profilePicture;


    const newComment = new Comment({
      creatorpiccom:userprof,
      creatorcomment:username,
      comment,
      postId,
      userId,
    });
    await newComment.save();

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