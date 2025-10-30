import express from "express";
import dotenv from "dotenv" ;
import connectDB from "./config/db.js"; 
import userRoutes from "./routes/userRoutes.js";
import { protect , authorizeRoles } from "./middleware/auth.middleware.js";
import courseRoutes from "./routes/courseRoutes.js"
import studentRoutes from "./routes/studentRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/courses" , courseRoutes);

app.get("/api/protected",protect,(req,res)=>{
    res.json({message:"You have accessed a protected route" , user:req.user});
});

app.use("/api", studentRoutes);


app.use("/api/students",studentRoutes);

app.get("/api/admin-only", protect , authorizeRoles("admin"),(req,res)=>{
    res.json({ message: "welcome Admin!"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server running on port ${PORT}`))
