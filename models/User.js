import { password } from "@inquirer/prompts";
import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String
})

userSchema.statics.hashPassword = (clearPassword) => {
    return bcrypt.hash(clearPassword, 5)
}

const User = mongoose.model('User', userSchema)

export default User