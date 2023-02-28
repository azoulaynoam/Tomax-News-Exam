import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import cors from "cors";
import bodyParser from "body-parser";

if (process.env.NODE_ENV?.toLowerCase() !== "production") dotenv.config();
const server = express();
if (process.env.NODE_ENV?.toLowerCase() !== "production")
  server.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
routes(server);
server.listen(process.env.PORT || 8000);
console.log("Server is running on port " + process.env.PORT || 8000);
