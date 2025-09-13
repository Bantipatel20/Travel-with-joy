import { v2 as cloudinary } from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const hotelstorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"TMS/hotels",
        allowed_formats: ["jpg,jpeg,png"],
        transformation:[{width:800,height:600,crop:"limit"}],
    },
})

const destinationstorage = new CloudinaryStorage({
    cloudinary,
    params: {
    folder: "TMS/destinations",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 1000, height: 700, crop: "limit" }],
  }
})

export const uploadhotel = multer ( {storage:hotelstorage});
export const uploaddestination = multer({storage:destinationstorage});

export default cloudinary;