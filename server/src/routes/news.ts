import axios from "axios";
import { Request, Response } from "express";

type categoriesEnum =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

async function get_news(
  req: Request<{
    category: categoriesEnum;
  }>,
  res: Response
) {
  try {
    const category = req.params.category;
    if (categories.indexOf(category) === -1) {
      res.sendStatus(400);
      throw new Error("Invalid category");
    }
    const news = await axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${process.env.COUNTRY_CODE}&category=${category}&apiKey=${process.env.API_KEY}`
      )
      .then((response) => response.data)
      .catch((error) => {
        res.sendStatus(500);
        throw new Error(error);
      });
    res.json(news);
  } catch (error) {
    res.status(500);
  }
}

export default { get_news };
