import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import CourseForm from "../component/CourseForm";
import CourseList from "../component/CourseList";
import StudentForm from "../component/StudentForm";
import StudentList from "../component/StudentList";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  
  const fetchUser = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/login");

    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser._id;
    if (!userId) return navigate("/login");

    try {
      let res;
      if (parsedUser.role === "student") {
        res = await API.get(`/students/${userId}`);
      } else {
        res = await API.get(`/users/${userId}`);
      }

      const userData = Array.isArray(res.data) ? res.data[0] : res.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Failed to fetch user:", err.response || err);
      navigate("/login");
    }
  };

 
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    }
  };

  
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

 
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUser();
      await fetchUsers();
      await fetchCourses();
      await fetchStudents();
    };
    loadData();
  }, []);

  if (!user) return <div className="text-white text-center mt-20">Loading...</div>;

  
  const handleEnroll = async (courseId) => {
    try {
      await API.post(`/students/enroll/${user._id}`, { courseId });
      alert("Successfully enrolled!");
      fetchUser(); 
    } catch (error) {
      alert(error.response?.data?.message || "Error enrolling in course");
    }
  };

 
  const getEnrolledCourses = () => {
    if (!user.courses) return [];
    const enrolledIds = user.courses.map(c => c._id?.toString() || c);
    return courses.filter(c => enrolledIds.includes(c._id.toString()));
  };

 
  const getAvailableCourses = () => {
    const enrolledIds = user.courses?.map(c => c._id?.toString() || c) || [];
    return courses.filter(c => !enrolledIds.includes(c._id.toString()));
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 p-4 sm:p-6 md:p-8">
    <div className="w-full max-w-6xl mx-auto">
      {/* Greeting */}
      <p className="text-xl sm:text-2xl font-extrabold text-white text-center mb-6 sm:mb-10 drop-shadow-lg uppercase leading-snug">
        {user.role === "student" && `Hi ${user.name}, Welcome to your courses!`}
        {user.role === "teacher" && `Hi ${user.name}, Welcome to your teaching dashboard!`}
        {user.role === "admin" && `Hi ${user.name}, Welcome to the admin panel!`}
      </p>

      {/* ---------- ADMIN DASHBOARD ---------- */}
      {user.role === "admin" && (
        <>
          {/* Courses Section */}
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 sm:mb-6 border-b-2 border-blue-200 pb-2">
              Courses Management
            </h3>
            <CourseForm
              fetchCourses={fetchCourses}
              editingCourse={editingCourse}
              setEditingCourse={setEditingCourse}
              teachers={users.filter(u => u.role === "teacher")}
            />
            <CourseList
              courses={courses}
              fetchCourses={fetchCourses}
              setEditingCourse={setEditingCourse}
              user={user}
            />
          </section>

          {/* Students Section */}
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 sm:mb-6 border-b-2 border-blue-200 pb-2">
              Students Management
            </h3>
            <StudentForm
              fetchStudents={fetchStudents}
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
              courses={courses}
            />
            <StudentList
              students={students}
              fetchStudents={fetchStudents}
              setEditingStudent={setEditingStudent}
            />
          </section>
        </>
      )}

      {/* ---------- TEACHER DASHBOARD ---------- */}
      {user.role === "teacher" && (
        <>
          {/* My Courses */}
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 sm:mb-6 border-b-2 border-blue-200 pb-2">
              My Courses
            </h3>
            <CourseList
              courses={courses.filter(c => c.teacher && c.teacher._id === user._id)}
              fetchCourses={fetchCourses}
              setEditingCourse={setEditingCourse}
              user={user}
              readOnly={true}
            />
          </section>

          {/* Enrolled Students */}
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 overflow-x-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 sm:mb-6 border-b-2 border-blue-200 pb-2">
              Enrolled Students
            </h3>
            {courses.length > 0 ? (() => {
              const teacherCoursesIds = courses
                .filter(c => c.teacher && c.teacher._id === user._id)
                .map(c => c._id.toString());
              const enrolledStudents = students.filter(s =>
                Array.isArray(s.courses) &&
                s.courses.some(c => teacherCoursesIds.includes(c._id?.toString() || c))
              );
              return enrolledStudents.length > 0 ? (
                <StudentList
                  students={enrolledStudents}
                  fetchStudents={fetchStudents}
                  setEditingStudent={setEditingStudent}
                  readOnly={true}
                />
              ) : (
                <p>No students enrolled yet.</p>
              );
            })() : <p>No courses assigned yet.</p>}
          </section>

          {/* Upload Assignment */}
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 mt-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 border-b-2 border-blue-200 pb-2">
              Upload Assignment
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Assignment uploaded successfully!"); }} className="space-y-4">
              <div>
                <label className="block text-blue-900 font-medium mb-2">Title</label>
                <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter assignment title" required />
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-2">Description</label>
                <textarea className="w-full border rounded-lg p-2" placeholder="Enter assignment details..." rows="3" required></textarea>
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-2">Upload File</label>
                <input type="file" className="w-full border p-2 rounded-lg" required />
              </div>
              <button type="submit" className="bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition">
                Upload Assignment
              </button>
            </form>
          </section>

          {/* Attendance Table */}
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 mt-8 overflow-x-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 border-b-2 border-blue-200 pb-2">
              Mark Attendance
            </h3>
            <table className="w-full text-left border text-sm sm:text-base">
              <thead>
                <tr className="bg-blue-100 text-blue-950">
                  <th className="p-2 border">Student Name</th>
                  <th className="p-2 border">Present</th>
                  <th className="p-2 border">Absent</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="p-2 border">{student.name}</td>
                    <td className="p-2 border text-center"><input type="radio" name={`att-${student._id}`} /></td>
                    <td className="p-2 border text-center"><input type="radio" name={`att-${student._id}`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Save Attendance
            </button>
          </section>

          {/* Grade Assignments */}
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 mt-8 overflow-x-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 border-b-2 border-blue-200 pb-2">
              Grade Assignments
            </h3>
            <table className="w-full text-left border text-sm sm:text-base">
              <thead>
                <tr className="bg-blue-100 text-blue-950">
                  <th className="p-2 border">Student</th>
                  <th className="p-2 border">Assignment</th>
                  <th className="p-2 border">Marks</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 3).map((student, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 border">{student.name}</td>
                    <td className="p-2 border">Assignment {i + 1}</td>
                    <td className="p-2 border"><input type="number" className="border p-1 w-20 rounded" placeholder="0-100" /></td>
                    <td className="p-2 border">
                      <button className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">Save</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Announcement */}
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 mt-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 border-b-2 border-blue-200 pb-2">
              Post Announcement
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Announcement posted!"); }} className="space-y-4">
              <div>
                <label className="block text-blue-900 font-medium mb-2">Announcement Title</label>
                <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g., Upcoming test schedule" required />
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-2">Description</label>
                <textarea className="w-full border rounded-lg p-2" rows="3" placeholder="Enter announcement details..." required></textarea>
              </div>
              <button type="submit" className="bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition">
                Post Announcement
              </button>
            </form>
          </section>
        </>
      )}

      {/* ---------- STUDENT DASHBOARD ---------- */}
      {user.role === "student" && (
        <>
          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 sm:mb-6 border-b-2 border-blue-200 pb-2">
              My Courses
            </h3>
            {getEnrolledCourses().length > 0 ? (
              <CourseList
                courses={getEnrolledCourses()}
                fetchCourses={fetchCourses}
                user={user}
                refreshUser={fetchUser}
                setEditingCourse={setEditingCourse}
              />
            ) : (
              <div className="text-gray-500 text-center">You are not enrolled in any courses yet.</div>
            )}
          </section>

          <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-950 mb-4 sm:mb-6 border-b-2 border-blue-200 pb-2">
              Available Courses
            </h3>
            {getAvailableCourses().length > 0 ? (
              <ul className="space-y-3">
                {getAvailableCourses().map(course => (
                  <li key={course._id} className="flex flex-col sm:flex-row justify-between sm:items-center bg-white/80 p-3 rounded-lg shadow-sm">
                    <span className="text-sm sm:text-base mb-2 sm:mb-0">
                      <strong>{course.title}</strong> — {course.description}
                    </span>
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
                    >
                      Enroll
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 text-center">No new courses available.</div>
            )}
          </section>
        </>
      )}
    </div>
  </div>
);
}
export default Dashboard;
