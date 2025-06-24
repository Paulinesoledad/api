const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Make sure this path matches your structure

// Seed dummy posts
router.get('/seed', async (req, res) => {
  try {
    const dummyPosts = [
      {
        title: 'First Post - Welcome!',
        content: 'This is my very first post on this blog. Excited to share more!',
        author: 'Pauline',
        image: 'https://via.placeholder.com/400',
      },
      {
        title: 'Learning MERN Stack',
        content: 'The journey has been intense but I am making progress daily.',
        author: 'Pauline',
        image: 'https://via.placeholder.com/400',
      },
    ];

    await Blog.insertMany(dummyPosts);
    res.status(201).json({ message: 'Dummy posts added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to seed posts', error: err.message });
  }
});
// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    const newPost = new Blog({
      title,
      content,
      author,
      image,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
});


module.exports = router;
