import 'dotenv/config';
import { config, uploader } from 'cloudinary';

const configCloudinary = (req, res, next) => {
    config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    return next();
};


export { configCloudinary, uploader };