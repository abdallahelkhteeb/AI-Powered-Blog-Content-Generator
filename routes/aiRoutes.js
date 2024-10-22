const express = require('express');
const { generateBlogPost } = require('../controllers/aiPostController');
const router = express.Router();

router.post('/generate-post', generateBlogPost);

module.exports = router;
