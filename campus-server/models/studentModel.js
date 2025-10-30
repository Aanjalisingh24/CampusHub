import mongoose from "mongoose";
import "./courseModel.js";

const studentSchema = new mongoose.Schema(
    {
         name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    rollNumber:{
        type: String,
        required: true,
        unique:true,
    },
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    role: { type: String, default: "student" },
},
{
    timestamps: true,
}
);

const Student = mongoose.model("Student", studentSchema);
export default Student;