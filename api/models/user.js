import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin','fieldowner'],
        default: 'user'
      },
      profilePicture: {
        type: String,
        default:
          'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
      },
      birthday:{
        type: String,
    },
    phone:{
        type: String,
    },
    matchs:{
        type: Number,
        default:0,
    },
    posts:{
        type: Number,
        default:0,
    },
    comments:{
        type: Number,
        default:0,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;