import API from "../api/api";

function CourseList({ courses = [], fetchCourses, setEditingCourse, user, readOnly }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await API.delete(`/courses/${id}`);
        fetchCourses();
      } catch (error) {
        alert(error.response?.data?.message || "Error deleting course");
      }
    }
  };

  if (!courses.length) {
    return <div className="text-gray-600 text-center">No courses available.</div>;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold mb-4">Courses List</h3>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li
            key={course._id}
            className="flex justify-between items-center bg-white/80 p-3 rounded-lg shadow-sm"
          >
            <span>
              <strong>{course.title}</strong> — {course.description}
              {course.teacher?.name && (
                <span className="text-sm text-gray-500 ml-2">
                  (Teacher: {course.teacher.name})
                </span>
              )}
            </span>

            {user?.role === "admin" && !readOnly && (
              <div className="space-x-2">
                <button
                  onClick={() => setEditingCourse(course)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
