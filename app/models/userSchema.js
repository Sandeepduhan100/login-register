import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
},
{
    timestamps: true
});

// Use the correct collection name "users"
const User = mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;
