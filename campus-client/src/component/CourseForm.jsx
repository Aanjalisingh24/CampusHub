import { useState, useEffect } from "react";
import API from "../api/api";

function CourseForm({ fetchCourses, editingCourse, setEditingCourse, teachers }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");

  useEffect(() => {
  if (editingCourse) {
    setTitle(editingCourse.title);
    setDescription(editingCourse.description);
    setTeacherId(editingCourse.teacher?._id || "");
  }
}, [editingCourse]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const selectedTeacher = teachers.find(t => t._id === teacherId);

    const data = {
      title,
      description,
      teacher: selectedTeacher || null,
    };

    if (editingCourse) {
      await API.put(`/courses/${editingCourse._id}`, data);
      setEditingCourse(null);
    } else {
      await API.post("/courses", data);
    }

    setTitle("");
    setDescription("");
    setTeacherId("");
    fetchCourses();
  } catch (error) {
    alert(error.response?.data?.message || "Error saving course");
  }
};


  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        {editingCourse ? "Edit Course" : "Add Course"}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="font-medium mt-2">Assign Teacher:</label>
        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 transition"
        >
          {editingCourse ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
