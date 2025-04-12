const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: {
      font: { type: String, default: "Arial" },
      outerBackgroundColor: { type: String, default: "" },
      mainBackgroundColor: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
