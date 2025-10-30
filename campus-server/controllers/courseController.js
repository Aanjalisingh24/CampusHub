import Course from "../models/courseModel.js";
import Student from "../models/studentModel.js";


export const createCourse = async (req, res) => {
  try {
    const { title, description, teacher } = req.body;

    const course = await Course.create({ title, description, teacher });

    await Student.updateMany({}, { $push: { courses: course._id } });

    const populatedCourse = await Course.findById(course._id).populate(
      "teacher",
      "name email role"
    );

    res.status(201).json(populatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name email role");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "teacher",
      "name email role"
    );
    if (!course)
      return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("teacher", "name email role");
    if (!course)
      return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    
    await Student.updateMany({}, { $pull: { courses: course._id } });

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
