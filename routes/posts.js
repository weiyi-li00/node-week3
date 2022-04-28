//第二層路徑
var express = require("express");
var router = express.Router();
const Post = require("../models/postsModel");
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
  const { body } = req;
  const newpost = await Post.create(body);
  if (body.content !== "" && body.content !== undefined) {
    res.status(200).json({
      status: "status",
      post: newpost
    });
  } else {
    res.status(400).json({
      status: "false",
      data: "使用者資料未填寫完整"
    });
  }
});
//編輯單筆
router.patch("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  if (body.content !== "" && body.content !== undefined) {
    const editPost = await Post.findByIdAndUpdate(id, body);
    if (editPost !== null) {
      res.status(200).json({
        status: "success",
        data: await Post.findById(editPost._id)
      });
    } else {
      res.status(400).json({
        status: "false",
        data: "使用者資料未填寫完整"
      });
    }
  } else {
    res.status(400).json({
      status: "false",
      methods: "patch",
      data: "使用者資料未填寫完整"
    });
  }
});
//刪除單筆
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const delPost = await Post.findByIdAndDelete(id);
  if (delPost !== null) {
    res.status(200).json({
      status: "success",
      data: await Post.find()
    });
  } else {
    res.status(400).json({
      status: "false",
      methods: "del",
      data: "id不正確"
    });
  }
});
module.exports = router;
