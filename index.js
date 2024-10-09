const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser=require('body-parser');
const app = express();
const port = 5000;
const crypto = require("crypto");
require("dotenv").config();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
const client=process.env.client_URL;

const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const blogRoutes = require('./routes/blogs');
const payments = require("./routes/payments")
  
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use("/api/payments",payments);

app.post('/success', (req, res) => {
  // Handle success response
  // res.send('Payment Successful');
  res.redirect(`${client}/success`);
});

app.post('/failure', (req, res) => {
  console.log(req.body);
  // Handle failure response
  // res.send('Payment Failed');
  res.redirect(`${client}/failure`);
});

app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

async function updateProductSequences() {
  try {
    const Product = require('./models/Product'); 
    const products = await Product.find().sort({ _id: 1 }); 

    for (let i = 0; i < products.length; i++) {
      products[i].minimum = i + 1;
      await products[i].save(); 
    }

    console.log('All product sequences updated successfully');
  } catch (error) {
    console.error('Error updating product sequences:', error);
  } finally {
    mongoose.connection.close(); 
  }
}


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
