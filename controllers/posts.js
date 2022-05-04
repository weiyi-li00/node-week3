const handleSuccess = require("../service/handleSuccess");
const handleError = require("../service/handleError");
const Post = require("../models/postsModel");

const posts = {
  async getPosts(req, res) {
    const post = await Post.find();
    handleSuccess(res, post);
  },
  async createPosts(req, res) {
    try {
      const { body } = req;
      const newpost = await Post.create(body);
      if (body.content) {
        handleSuccess(res, newpost);
      } else if (body.name) {
        handleSuccess(res, newpost);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async patchPosts(req, res) {
    const { body } = req;
    const { id } = req.params;
    const editPost = await Post.findByIdAndUpdate(id, body);
    console.log("iddd", editPost._id);
    try {
      if (body.content) {
        const editPost = await Post.findByIdAndUpdate(id, body);
        if (editPost) {
          const editda = await Post.findById(editPost._id);
          handleSuccess(res, editda);
        } else {
          handleError(res);
        }
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async deletePosts(req, res) {
    const { id } = req.params;
    const delPost = await Post.findByIdAndDelete(id);
    if (delPost) {
      const delda = await Post.find();
      handleSuccess(res, delda);
    } else {
      handleError(res);
    }
  }
};

module.exports = posts;
