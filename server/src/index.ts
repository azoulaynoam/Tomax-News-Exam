import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import cors from "cors";

if (process.env.NODE_ENV?.toLowerCase() !== "production") dotenv.config();
const server = express();
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
routes(server);
server.listen(process.env.PORT || 8000);
console.log("Server is running on port " + process.env.PORT || 8000);
