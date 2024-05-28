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
    creator: {
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
    field: {
        type: String,
    },
    picfield: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaPPnZ5cT6rU9Naf3wD0lkhBbfoyPMwxvbQ&usqp=CAU',
    },
    team1: {
        type: Array,
    },
    team2:{
        type: Array,

    },
    reservationdate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

export default Match;
