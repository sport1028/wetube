import express from "express";

import logger from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();



app.use(express.urlencoded({ extended:true }));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger("dev"));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;