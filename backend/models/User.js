import mongoose from "mongoose";

import bcrypt from "bcryptjs"
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      select: false,

    },
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);


UserSchema.pre("save", async function () {
  /**
   * Checks if password is modified, if not returns
   */
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (userPassword) {
  /**
   * Compares use's password with the password in the database
   */
  const isMatched = await bcrypt.compare(userPassword, this.password);
  return isMatched;
};


const User = mongoose.model("User", UserSchema);
export default User;