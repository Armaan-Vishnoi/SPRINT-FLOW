import mongoose, { Schema } from "mongoose";

const auditSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    entity: {
      type: String,
      required: true,
    },

    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    oldValue: {
      type: Object,
    },

    newValue: {
      type: Object,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("AuditLog", auditSchema);
