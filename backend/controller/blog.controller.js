import mongoose from "mongoose";
import {Blog} from '../models/blog.model.js';
import { v2 as cloudinary } from 'cloudinary';

export const createBlog = async (req, res) => {

    try {
        if(!req.files || Object.keys(req.files).length== 0){
            return res.status(400).json({message:"Blog Image is required"})
        }
    
        const {blogImage}= req.files;
        const allowedFormats = ["image/jpeg","image/png","image/webp"];
        if(!allowedFormats.includes(blogImage.mimetype)){
            return res.status(400).json({message:"invalid photo"})
        }
        const { title,category,about } = req.body;
    
        if (!title || !category || !about ) {
            return res.status(400).json({ message: "title category about are required fields" });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id;


    
        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        );
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error)
        }
    
        
        const blogData = ({ 
            title,
            about,
            category,
            adminName,
            adminPhoto,
            createdBy, 
            blogImage:{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        });
         
        const blog = await Blog.create(blogData);
    
            res.status(201).json({ message: "blog created  successfully",
                blog
             });
         
    } catch (error) {
        res.satus(500).json({error:"internal server error"})
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async(req,res)=>{

    const allBlogs = await Blog.find()
    res.status(200).json(allBlogs)

}

export const getSingleBlogs = async (req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"invalid blog id"})
    }

    const blog =await Blog.findById(id);
    if(!blog){
       return res.status(404).json({message:"blog not found"});
    }
    
    return res.status(200).json(blog);
}

export const getMyBlogs=async(req,res)=>{
    const createdBy = req.user._id;
    const myBlogs = await Blog.find({createdBy});
    res.status(200).json(myBlogs);
}

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog id" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  };

 


