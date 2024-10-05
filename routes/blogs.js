const express = require('express');
const Blog = require('../models/Blogs');
const router = express.Router();
const cloudinary = require("../cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
// Setup Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'products',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });
  
  const upload = multer({ storage });


router.post('/blogs', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({
            title,
            content,
            imageUrl: req.file ? req.file.path : ''
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/blogs/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/blogs/:slug', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug },
            {
                title,
                content,
                imageUrl: req.file ? req.file.path : req.body.imageUrl,
            },
            { new: true, runValidators: true }
        );
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/blogs/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
