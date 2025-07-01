const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost'); 

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

    const newPost = new BlogPost({
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

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting post' });
  }
});


// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;

  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while updating post' });
  }
});


// @route   GET /api/posts
// @desc    Get all blog posts

router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching posts' });
  }
});


module.exports = router;
