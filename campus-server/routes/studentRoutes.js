import express from "express";
import {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    enrollStudent,
} from "../controllers/studentController.js";

import {protect , authorizeRoles} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/",authorizeRoles("admin"),createStudent);
router.put("/:id",authorizeRoles("admin"),updateStudent);
router.delete("/:id",authorizeRoles("admin"),deleteStudent);
router.post("/students/enroll/:id", enrollStudent);

router.get("/students", getStudents);
router.get("/students/:id", getStudentById);

export default router;