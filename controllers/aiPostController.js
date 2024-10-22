const model = require("../openaiConfig"); // Import the initialized Google AI client
const Post = require("../models/Post"); // Your MongoDB Post model

// Blog post generation function
const generateBlogPost = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    // Use genAI to generate the blog post
    const result = await model.generateContent(
      `Write a blog post about ${topic}.`
    );

    
    const blogPost = result.response.text(); 

    // Save the blog post to MongoDB
    await Post.create({ title: topic, topic, content: blogPost });

    return res.status(200).json({ blogPost });
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  generateBlogPost,
};

// const genAI = require('../openaiConfig');
// const Post = require('../models/Post');

// // import

// async function ru() {
//   const model = genAI.getGenerativeModel({ model : "gemeini-pro" });

// }

// // const generateBlogPost = async (req, res) => {
// //     const { topic } = req.body;

// //     if (!topic) {
// //       return res.status(400).json({ error: "Topic is required" });
// //     }

// //     try {
// //       const response = await openai.chat.completions.create({
// //         model: "gpt-3.5-turbo",
// //         messages: [{ role: "user", content: `Write a blog post about ${topic}.` }],
// //         max_tokens: 500,
// //       });

// //       const blogPost = response.choices[0].message.content;

// //       // Save the blog post to MongoDB if you have a model
// //       await Post.create({ topic, content: blogPost });

// //       return res.status(200).json({ blogPost });
// //     } catch (error) {
// //       res.status(error.status).json({error: error.message});
// //     }
// //   };

// //   module.exports = {
// //     generateBlogPost,
// //   };
