import mongoose, { Schema } from "mongoose";


const workLogSchema = new Schema(
  {

    taskId:{
      type:Schema.Types.ObjectId,
      ref:"Task",
      required:true
    },


    sprintId:{
      type:Schema.Types.ObjectId,
      ref:"Sprint",
      required:true
    },


    userId:{
      type:Schema.Types.ObjectId,
      ref:"User",
      required:true
    },


    date:{
      type:Date,
      required:true
    },


    duration:{
      type:Number,
      required:true
    },


    description:{
      type:String,
      required:true
    }

  },

  {
    timestamps:true
  }

);


export default mongoose.model(
  "WorkLog",
  workLogSchema
);