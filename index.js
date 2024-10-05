const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv").config()
const app = express();
const port = 5000;
const crypto = require("crypto");


app.use(cors({ origin: '*' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const blogRoutes = require('./routes/blogs');
const payments = require("./routes/payments")

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use("/api/payments",payments)

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


const key = 'qRhovz'
const txnid = '123456'; 
const amount = '1000';
const productinfo = 'product_name'; 
const firstname = 'John'; 
const email = 'john@example.com'; 
const salt = '7C0ksxLARbSbBsIaZVqohPHcYkBWtEAf';

function generateHash(key, txnid, amount, productinfo, firstname, email, salt) {
  const input = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(input).digest('hex');
}
console.log(generateHash(key,txnid,amount,productinfo,firstname,email,salt))

// Start the server on localhost
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
