const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'postImages', // Folder in your Cloudinary account to store images
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
