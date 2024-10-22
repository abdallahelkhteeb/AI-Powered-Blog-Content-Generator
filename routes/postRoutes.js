const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

// router.post('/posts', postController.createPost);
// router.get('/posts', postController.getPosts);
// router.Router('/').get();
router
  .route("/posts")
  .get(postController.getPosts)
  .post(postController.createPost);

// router.put("/:id", postController.updatePost);
// router.delete('/:id', postController.deletePost);

router
  .route("/:id").put(postController.updatePost).delete(postController.deletePost);

// router.route('/').get()
module.exports = router;
