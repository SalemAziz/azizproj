import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      
    },

    creatorpost: {
      type: String,
      
    },
    creatorpic:{
      type: String,
      
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;