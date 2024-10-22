const Post = require('../models/Post');

// Create a blog post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({ title, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all blog posts
exports.getPosts = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1; // page number
    const limit = req.query.limit * 1 || 10; // number of posts per page
    const skip = (page - 1) * limit; // how many posts to skip

    const posts = await Post.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error fetching posts',
      error: err.message,
    });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns the modified document
      runValidators: true, // ensures validation rules in the schema are respected
    });

    if (!updatedPost) {
      return res.status(404).json({
        status: 'fail',
        message: 'No post found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        post: updatedPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error updating post',
      error: err.message,
    });
  }
};


// In controllers/postController.js
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'No post found with that ID',
      });
    }

    res.status(204).json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error deleting post',
      error: err.message,
    });
  }
};
