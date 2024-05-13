import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    matchname:{
        type: String,
        required: true,
        unique: true,
    },

   
    fees:{
        type: String,
        required: true,
        unique: true,
    },

    creator:{
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
  
    },
    creatorusername:{
        type: String,
        ref: "user",
        required: true,
  
    },
    field: {
        type: String,
       
      },
      picfield: {
        type: String,
        default:
          'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
      },
      players:{
        type: Array,
        
    },
    reservationdate:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    }


}, {timestamps: true});

const Match = mongoose.model('Match', matchSchema);

export default Match;