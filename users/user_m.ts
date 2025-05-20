import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const UsersCollection = mongoose.model('Users', userSchema);
