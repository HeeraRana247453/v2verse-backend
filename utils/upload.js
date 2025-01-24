require('dotenv').config({ path: '../config/.env' });
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary (best moved to a config file)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (filePath, folderName) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName,
        });
        return result;
    } 
    catch (error) {
        console.error("Upload Error:", error);
        throw error;
    }
};

const deleteFile = async(publicId) =>{
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
}

module.exports = {uploadFile, deleteFile};  // export the functions to be used in other