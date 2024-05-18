import mongoose from 'mongoose';

const DemandeSchema = new mongoose.Schema({
  
    ownerfullname:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },  
     numtel: {
        type: String,
    },
    fees: {
        type: String,
        default: "50",
    },
    adress: {
        type: String,
        
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    playerallowd:{
        type: String,
        required: true,
        unique: true,
    },

    fieldname: {
        type: String,
    },
    picfield: {
        type: Array,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaPPnZ5cT6rU9Naf3wD0lkhBbfoyPMwxvbQ&usqp=CAU',
    },
 
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Demande = mongoose.model('Demande', DemandeSchema);

export default Demande;
