const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: 'diq9nxcdo',
  api_key: process.env.c_key,
  api_secret: process.env.c_secret
});

module.exports = cloudinary;
