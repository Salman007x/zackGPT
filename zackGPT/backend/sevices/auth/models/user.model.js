import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firebaseUID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: "https://example.com/default-avatar.png",
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;