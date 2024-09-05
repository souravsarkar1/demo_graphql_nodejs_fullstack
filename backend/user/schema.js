import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    address: { type: String }
}, { timestap: true, versionKey: false })


const UserModel = mongoose.model("user", userSchema);

export { UserModel }