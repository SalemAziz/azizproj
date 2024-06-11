import mongoose, { syncIndexes } from 'mongoose';

const matchSchema = new mongoose.Schema({
    matchname: {
        type: String,
        required: true,
        unique: true,
    },
    fees: {
        type: String,
        default: "50",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    numberOfPlayers:{
        type:Number,
        default:0,
    },

    creatorpic: {
        type: String,
        ref: "user",
        required: true,
    },
    creatorusername: {
        type: String,
        ref: "user",
        required: true,
    },
    fieldId: {
        type: String,
    },
    fieldname: {
        type: String,
    },
    
    picfield: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaPPnZ5cT6rU9Naf3wD0lkhBbfoyPMwxvbQ&usqp=CAU',
    },
    team1: [
        {
          username: String,
          role: String,
        },
      ],
    team2: [
        {
          username: String,
          role: String,
        },
      ],
   
        dayofthweek:{
            type:String,
            require:true,
    
        },
        houroflocation:{
            type:String,
            require:true,
            unique:true,

        },
  

    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

export default Match;
