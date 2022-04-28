var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./confing.env" });
const mongoose = require("mongoose");
const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => console.log("資料庫連接成功"));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");

var app = express();
//設定檔
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//第一層路由
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

module.exports = app;
