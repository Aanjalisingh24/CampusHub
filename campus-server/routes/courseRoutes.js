import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { protect, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorizeRoles("admin"), createCourse);
router.put("/:id", authorizeRoles("admin"), updateCourse); 
router.delete("/:id", authorizeRoles("admin"), deleteCourse);

router.get("/", getCourses);
router.get("/:id", getCourseById);

export default router;
