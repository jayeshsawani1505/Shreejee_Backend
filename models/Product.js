const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
  unit: { type: String }, 
  quantity: { type: Number },
  price: { type: Number } 
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  details: { type: String },
  variations: [variationSchema],
  price: { type: String },
  quantity: { type: Number },
  image: [{ type: String }] ,
  squence:{type:Number},
  minimum:{type:Number}
});
 
module.exports = mongoose.model('Product', productSchema);
