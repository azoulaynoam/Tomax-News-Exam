import { Express } from "express";
import news from "../contollers/news";

function setRoutes(server: Express) {
  server.get("/news/:category", news.get_news);
}

export default setRoutes;
