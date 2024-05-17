import mongoose from 'mongoose';

const DemandeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    owner:{
        type: String,
    },
    fees: {
        type: String,
        default: "50",
    },
    location: {
        type: String,
        ref: "user",
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
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaPPnZ5cT6rU9Naf3wD0lkhBbfoyPMwxvbQ&usqp=CAU',
    },
    numtel: {
        type: String,
    },

    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Demande = mongoose.model('Demande', DemandeSchema);

export default Demande;
