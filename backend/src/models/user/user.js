/*jshint esversion: 8 */
import { Schema, model } from "mongoose";

const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  avatarUrl: String,
});

export default model("User", user);