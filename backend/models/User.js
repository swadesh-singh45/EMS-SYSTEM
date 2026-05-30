import mongoose from "mongoose";

const userScheema = new mongoose.Schema({
  
  email : { type: String, required: true, unique: true },
  password : { type: String, required: true, },
  role : { type: String, enum: ["ADMIN", "EMPLOYEE"], default: "EMPLOYEE"},
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userScheema)

export default User;

