
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },

    socialId: {
      type: String,
      default: null,
    },
    signuptype: {
      type: String,
      enum: ["N", "F","T","G"],
      default: "N",
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.index(
  { socialId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      socialId: { $exists: true, $ne: null },
    },
  }
);

export default mongoose.model("User", userSchema);
