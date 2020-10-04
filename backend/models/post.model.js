const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email: { type: String, required: true },
  dateOfPublication: { type: Date, required: true },
  dateOfUpdate: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
});

module.exports = mongoose.model('Post', postSchema);
