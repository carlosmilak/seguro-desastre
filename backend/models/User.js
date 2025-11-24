import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["help", "volunteer"], required: true } // "help" = precisa de ajuda, "volunteer" = voluntário
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
