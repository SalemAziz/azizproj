import mongoose from 'mongoose';

const DemandeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    owner:{
        type: String,
        required: true,
        unique: true,
    },
    fees: {
        type: String,
        default: "50",
    },
    location: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    playerallowd:{
        type: String,
        required: true,
        unique: true,
    },

    field: {
        type: String,
    },
    picfield: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXaPPnZ5cT6rU9Naf3wD0lkhBbfoyPMwxvbQ&usqp=CAU',
    },
    numtel: {
        type: Array,
    },

    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Demande = mongoose.model('Demande', DemandeSchema);

export default Demande;
