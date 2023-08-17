const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
  getPost,
} = require("../controllers/posts.controllers");

router.get("/posts", getPosts);

router.post("/posts", createPosts);

router.put("/posts/:id", updatePosts);

router.delete("/posts/:id", deletePosts);

router.get("/posts/:id", getPost);

module.exports = router;
