import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"

const app = express()


 
dotenv.config();

const port = process.env.PORT;
const MONG0_URL = process.env.MONGO_URI;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173", // Local development
    "https://blog-app-frontend-flax.vercel.app" // Deployed frontend
  ], // Match the exact origin (no trailing slash)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers)
}));


app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/",
}))


// db code
try {
    mongoose.connect(MONG0_URL)
    console.log("connected to MongoDB");
} catch (error) {
    console.log(error)
}

//cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET  // Click 'View API Keys' above to copy your API secret
});

//defining routes 
app.use("/api/users",userRoute)
app.use("/api/blogs",blogRoute)

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})