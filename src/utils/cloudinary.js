const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary (add your credentials)
cloudinary.config({
  cloud_name: 'dcazz67al',
  api_key: '879873551654928',
  api_secret: 'PAzAkHp89YfiFKOg8KcbWDLF8jM',
});

// Function to upload the image and get the URL
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'payments',  // Store in a folder called "payments"
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],  // Supported file types
    },
  });
  const upload = multer({ storage: storage }); // Create multer middleware

  module.exports = upload;
