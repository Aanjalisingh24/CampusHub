import { useState, useEffect } from "react";
import API from "../api/api";

function StudentForm({ fetchStudents, editingStudent, setEditingStudent, courses }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setRollNumber(editingStudent.rollNumber);
      setSelectedCourses(
        Array.isArray(editingStudent.courses)
          ? editingStudent.courses.map((c) => c._id)
          : []
      );
    }
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, rollNumber, courses: selectedCourses };
      if (editingStudent) {
        await API.put(`/students/${editingStudent._id}`, data);
        setEditingStudent(null);
      } else {
        await API.post("/students", data);
      }
      setName("");
      setEmail("");
      setRollNumber("");
      setSelectedCourses([]);
      fetchStudents();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving student");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{editingStudent ? "Edit Student" : "Add Student"}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="font-medium mt-2">Enroll in Courses:</label>
        <select
          multiple
          value={selectedCourses}
          onChange={(e) =>
            setSelectedCourses(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="border p-2 rounded"
        >
          {(courses || []).map((course) => (
            <option key={course._id} value={course._id}>
              {course.title} {course.teacherName ? `- ${course.teacherName}` : ""}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 transition"
        >
          {editingStudent ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
