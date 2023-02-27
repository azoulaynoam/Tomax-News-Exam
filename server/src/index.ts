import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";

if (process.env.NODE_ENV?.toLowerCase() !== "production") dotenv.config();
const server = express();
routes(server);
server.listen(process.env.PORT || 8000);
console.log("Server is running on port " + process.env.PORT || 8000);
