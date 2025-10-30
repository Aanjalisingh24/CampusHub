import mongoose from "mongoose";
import "../models/userModel.js"

const courseSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
        },
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course",courseSchema);
export default Course;