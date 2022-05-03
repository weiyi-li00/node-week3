//第二層路徑
var express = require("express");
var router = express.Router();
const Post = require("../models/postsModel");
const handleError = require("../service/handleError");
//資料全撈
router.get("/", async (req, res) => {
  //res.send("respond with a resource"); //回傳網頁格式
  res.status(200).json({
    status: "status",
    post: await Post.find()
  });
});
//新增單筆
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const newpost = await Post.create(body);
    if (body.content) {
      res.status(200).json({
        status: "status",
        post: newpost
      });
    } else if (body.name) {
      res.status(200).json({
        status: "status",
        post: newpost
      });
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
        res.status(200).json({
          status: "success",
          data: await Post.findById(editPost._id)
        });
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
    res.status(200).json({
      status: "success",
      data: await Post.find()
    });
  } else {
    handleError(res);
  }
});
module.exports = router;
