function StudentList({ students, fetchStudents, setEditingStudent, readOnly }) {
  return (
    <div className="flex flex-col gap-2">
      {students.map((student) => (
        <div
          key={student._id}
          className="bg-white rounded shadow p-4 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              {student.name} - {student.rollNumber}
            </span>

            {!readOnly && (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingStudent(student)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm("Are you sure?")) {
                      try {
                        await API.delete(`/students/${student._id}`);
                        fetchStudents();
                      } catch (err) {
                        alert("Delete failed");
                      }
                    }
                  }}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {student.courses && student.courses.length > 0 ? (
            <div className="ml-4">
              <strong>Courses:</strong>
              <ul className="list-disc list-inside">
                {student.courses.map((course) => (
                  <li key={course._id}>{course.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="ml-4 text-gray-500">No courses enrolled</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default StudentList;
