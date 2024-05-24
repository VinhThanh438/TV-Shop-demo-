const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storageProduct = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: async (req, file) => {
        req.file = file;
        const newName = req.body.nameproduct.replace(/\s+/g, '');
        return {
            folder: 'products',
            public_id: newName,
        };
    },
});

const storageUser = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: async (req, file) => {
        req.file = file;
        const newName = req.body.nameuser.replace(/\s+/g, '');
        return {
            folder: 'users',
            public_id: newName,
        };
    },
});

const uploadCloudUser = multer({ storageUser });
const uploadCloudProduct = multer({ storageProduct });

uploadCloudProduct.storage = storageProduct;
uploadCloudUser.storage = storageUser;

module.exports = { uploadCloudProduct, uploadCloudUser };
