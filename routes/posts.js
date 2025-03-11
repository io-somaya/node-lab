const express = require("express");
const postsController = require("./../controllers/posts");
const auth = require("./../middlewares/auth");
const router = express.Router();

// Protect all routes with auth middleware
router.use(auth);

// Search posts
router.get("/search", postsController.searchPosts);

// Create a post
router.post("/", postsController.createPost);

// Get all posts (with flags for authenticated user's posts)
router.get("/", postsController.getPosts);

// Get a specific post (with flag for authenticated user's post)
router.get("/:id", postsController.getPost);

// Update a post (only if created by the authenticated user)
router.patch("/:id", postsController.updatePost);

// Delete a post (only if created by the authenticated user)
router.delete("/:id", postsController.deletePost);

module.exports = router;