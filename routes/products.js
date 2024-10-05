const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("../cloudinary");
const Product = require('../models/Product');
const Category = require('../models/Category');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

router.post('/', upload.array('images'), async (req, res) => {
  const { name, categoryId, details, variations, price, quantity } = req.body;
  const images = req.files.map(file => file.path);

  try {
    const parsedVariations = JSON.parse(variations);

    const product = new Product({
      name,
      category: categoryId,
      details,
      price,
      quantity,
      variations: parsedVariations,
      image:images 
    });

    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).populate("category");
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/by-category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (categoryId === "All Products") {
      const products = await Product.find({})
      .populate("category")
      .sort({squence: 1 }); 
    return res.status(200).json(products);
    }

    const products = await Product.find({ category: categoryId }).populate("category");
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
