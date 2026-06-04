import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["PROJECT_MANAGER", "DEVELOPER"],
      default: "DEVELOPER",
    },

    profilePicture: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: null,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },

    isDeactivated: {
      type: Boolean,
      default: false,
    },
    pendingEmail: {
      type: String,
      default: null,
    },
    emailNotification: {
      type: Boolean,
      default: false,
    },
    emailChangeToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
