const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/posts', async (req, res) => {

	try {
		console.log('toms', req.body);
    const { email, dateOfPublication, dateOfUpdate, status, title, description, price } = req.body.data;
		const post = await Post.findById(req.body.id);
		// console.log('toms', post);
    if (post) {
      post.title = title,
      post.email = email,
      post.dateOfPublication = dateOfPublication,
      post.dateOfUpdate = dateOfUpdate,
      post.status = status,
      post.description = description,
      post.price = price,
      await post.save();
      res.json(post)
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
		console.log('Server error')
		// console.log(req.body.fields);
    res.status(500).json(err)
  }
})
router.post('/posts', async (req, res) => {
	console.log('body', req.body);
	try {
    const { email, dateOfPublication, dateOfUpdate, status, title, description, price } = req.body;
    const newPost = new Post({ email, dateOfPublication, dateOfUpdate, status, title, description, price });
    await newPost.save(); 
    res.json(newPost);
  } catch (err) {
		console.log('Server error', err)
		// console.log(req.body.fields);
    res.status(500).json(err);
  }
})
module.exports = router;
