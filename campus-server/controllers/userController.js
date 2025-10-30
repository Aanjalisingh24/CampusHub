import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";

export const registerUser = async(req,res)=>{
    const {name,email,password,role} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exits"});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({message:"User registered successfully" ,user});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    let responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    if (user.role === "student") {
      const student = await Student.findOne({ email: user.email }); 
      if (!student) return res.status(404).json({ message: "Student record not found" });

      responseUser = {
        _id: student._id,   
        name: student.name,
        email: student.email,
        role: user.role,
        courses: student.courses || [],
      };
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: responseUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
