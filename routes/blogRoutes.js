const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();

// POST: Create new blog post
router.post('/', async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = new BlogPost({ title, content, image });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save blog post', error: err });
  }
});

// GET: Fetch all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err });
  }
});

module.exports = router;
