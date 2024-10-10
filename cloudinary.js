const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: 'drsuiuchs',
  api_key: process.env.c_key,
  api_secret: process.env.c_secret
});

module.exports = cloudinary;
