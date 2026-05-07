import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: String,
  password: String
});

export default model("User", userSchema);