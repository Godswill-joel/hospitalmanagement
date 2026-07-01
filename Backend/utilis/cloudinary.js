import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//upload files into cloudinary

export async function uploadToCloudinary(filepath, folder = "Doctors") {
    try {
        const result = await cloudinary.uploader.upload(filepath, {
            folder,
            resource_type: "image"
        });

        //remove the local file after upload 
        fs.unlinkSync(filepath);
        return result;
    }
    catch (error) {
        console.error("cloudinary upload error", err);
        throw err;
    }
}


// to delete an imgae from cloudinary if user removes from the UI 
export async function deleteFromcloudinanry(publicId) {
    try {
        if (!publicId) return;
        await cloudinary.uploader.destroy(publicId);
    }
    catch (error) {
        console.error("Cloudinary delete error", err)
        throw err; 
    }

}

export default cloudinary; 

