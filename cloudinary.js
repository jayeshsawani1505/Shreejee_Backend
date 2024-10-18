const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: 'diq9nxcdo',
  api_key: 999817712761936,
  api_secret: FFC9TqOexPdT_f2m-hqonAfDLNs
});

module.exports = cloudinary;
