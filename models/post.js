const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A blog post must have a title'],
    minlength: [10, 'A blog post title must have at least 10 characters'],
  },
  content: {
    type: String,
    required: [true, 'A blog post must have content'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true } );

module.exports = mongoose.model('Post', PostSchema);
