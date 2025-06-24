import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
  User_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Register", RegisterSchema);