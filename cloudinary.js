const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drsuiuchs',
  api_key: '642315912216764',
  api_secret: 'Vcbz_AhheFe0EFU5woilvHYJBzM'
});

module.exports = cloudinary;
