const Post = require("../models/Post");
const { uploadImage, deleteImage } = require("../libs/cloudinary");
const fs = require("fs-extra");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createPosts = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newPost = new Post({ title, description, image });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePosts = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePosts = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    if (!postRemoved) {
      return res.sendStatus(404);
    }

    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id);
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);

    return res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getPosts, createPosts, updatePosts, deletePosts, getPost };
