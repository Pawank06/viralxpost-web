import express from "express";
import {
  createIdeas,
  createThreads,
  createTweets,
  deleteIdea,
  deleteThread,
  deleteTweet,
  getAllIdeas,
  getAllThreads,
  getAllTweets,
} from "../controllers/postControllers";
import authenticate from "../middlewares/authenticate";

const postRouter = express.Router();

postRouter.get("/tweets", authenticate, getAllTweets);
postRouter.delete("/tweets/:id", authenticate, deleteTweet);
postRouter.get("/threads", authenticate, getAllThreads);
postRouter.delete("/threads/:id", authenticate, deleteThread);
postRouter.post("/tweets", authenticate, createTweets);
postRouter.post("/threads", authenticate, createThreads);
postRouter.post("/ideas", authenticate, createIdeas);
postRouter.get("/ideas", authenticate, getAllIdeas);
postRouter.delete("/ideas/:id", authenticate, deleteIdea);

export default postRouter;
