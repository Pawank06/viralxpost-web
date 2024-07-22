import express from "express";
import userRouter from "./routes/userRouter";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import postRouter from "./routes/postRouter";
import cors from "cors";
import { config } from "./config/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://www.viralxpost.xyz/",
  })
);

app.get("/", (req, res) => {
  res.send("viralxpost");
});

app.use("/api/v0/users/", userRouter);
app.use("/api/v0/posts/", postRouter);

//gloabl error handler
app.use(globalErrorHandler);

export default app;
