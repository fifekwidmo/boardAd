const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  email: { type: String },
  dateOfPublication: { type: Date },
  dateOfUpdate: { type: Date },
  status: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model('Post', postSchema);
