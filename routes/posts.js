//第二層路徑
var express = require("express");
var router = express.Router();
const Post = require("../models/postsModel");
const handleError = require("../service/handleError");
const handleSuccess = require("../service/handleSuccess");
//資料全撈
router.get("/", async (req, res) => {
  const post = await Post.find();
  handleSuccess(res, post);
});
//新增單筆
router.post("/", async (req, res) => {
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
});
//編輯單筆
router.patch("/:id", async (req, res) => {
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
});
//刪除單筆
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const delPost = await Post.findByIdAndDelete(id);
  if (delPost) {
    const delda = await Post.find();
    handleSuccess(res, delda);
  } else {
    handleError(res);
  }
});
module.exports = router;
