import mongoose, { syncIndexes } from 'mongoose';

const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
       state:{
        type:String,
       },
       city:{
        type:String,
       },
       town:{
        type:String,
       }
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    ownerPhone:{
        type:String,
        required: true,

    },
    adminFieldAdder: { 
        type: String,
        required: true,
    },

    ownerName: {
        type: String,
        required: true,
    },
    ownerEmail: {
        type: String,
        ref: "user",
        required: true,
    },
    feesf: {
        type: String,
        required: true,

      
    },

    picfield: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaPPnZ5cT6rU9Naf3wD0lkhBbfoyPMwxvbQ&usqp=CAU',

    },
    
    workhour: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Field = mongoose.model('Field', fieldSchema);

export default Field;
