const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./confing.env" });
const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => console.log("資料庫連接成功"));
