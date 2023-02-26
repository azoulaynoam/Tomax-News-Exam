import express from "express";
import mongoose from "mongoose";

if (!process.env.DB_URI) {
  console.log("DB_URI is not defined");
  process.exit();
}

const server = express();
const mongDB = mongoose.connect(process.env.DB_URI);
server.listen(process.env.PORT || 8000);
console.log("Server is running on port " + process.env.PORT || 8000);
