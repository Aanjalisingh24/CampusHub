import Student from "../models/studentModel.js";
import Course from "../models/courseModel.js";


export const createStudent = async (req , res) => {
    try {
        const { name, email, rollNumber, courses } = req.body;

        let student = await Student.findOne({ email });

        if (student) {
            courses.forEach(courseId => {
                if (!student.courses.includes(courseId)) {
                    student.courses.push(courseId);
                }
            });

            await student.save();
            return res.status(200).json(student);
        }

        student = await Student.create({ name, email, rollNumber, courses });
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("courses", "title description");

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("courses", "title description");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateStudent = async (req,res) =>{
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body,{new: true});
        if(!student) return res.status(404).json({message:"Student not found"});
        res.json(student);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};


export const deleteStudent = async (req,res)=>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student) return res.status(404).json({message: "Student not found"});
        res.json({message: "Student deleted successfully"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};


export const enrollStudent = async (req, res) => {
  try {
    const { id } = req.params; 
    const { courseId } = req.body;

    const student = await Student.findById(id);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or Course not found" });
    }

    if (student.courses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    student.courses.push(courseId);
    await student.save();

    res.status(200).json({ message: "Enrollment successful", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during enrollment" });
  }
};


