import User from './../models/user.model.js';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";
import  createTokenAndSaveCookies from "../jwt/AuthToken.js"
 

export const register = async (req, res) => {

    try {
        if(!req.files || Object.keys(req.files).length== 0){
            return res.status(400).json({message:"photo is required"})
        }
    
        const {photo}= req.files;
        const allowedFormats = ["image/jpeg","image/png","image/webp"];
        if(!allowedFormats.includes(photo.mimetype)){
            return res.status(400).json({message:"invalid photo"})
        }
        const { email, name, password, phone, education, role } = req.body;
    
        if (!email || !name || !password || !phone || !education || !role) {
            return res.status(400).json({ message: "Please fill required fields" });
        }
    
        const existingUser = await User.findOne({ email }); // Rename to 'existingUser'
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }
    
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
        );
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error)
        }
    
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            email,
            name,
            password:hashPassword,
            phone,
            education,
            role, 
            photo:{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        });
        await newUser.save();
    
        if (newUser) {
            const token = await createTokenAndSaveCookies(newUser._id,res)
            res.status(200).json({ message: "User registered successfully",newUser,token: token });
        } 
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
};

export const login = async (req, res) => {

    const {email,password,role}=req.body

    try {

        if(!email || !password || !role){

            return res.status(400).json({ message: "please fill required fields  " });

        }
        const user = await User.findOne({email}).select("+password");
        
        if(!user.password){
            return res.status(400).json({ message: "user password is missing" });
            
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!user || !isMatch){
            return res.status(400).json({ message: "invalid email or passsword" });
        }

        if(user.role !== role){
            return res.status(400).json({ message: "given role not found" });
        }
        const token = await createTokenAndSaveCookies(user._id,res);
        res.status(200).json({
             message: "user loged in succesfully",
             user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
             },
            token: token,
            });
        
    } catch (error) {
        res.status(500).json({message:"failed to login user"})
        
    }

};

export const logout = async(req,res) => {
    res.clearCookie("jwt", {httpOnly: true});
    res.status(200).json({message:"user logged out succesfully"});
}

export const getMyProfile = async (req, res) => {
    const user = await req.user;
    res.status(200).json({ user });
  };

  export const getAdmins = async (req, res) => {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins });
  };