import cors from "cors";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {    // 만료날짜 없이 그냥 두겠다
    //     maxAge:20000
    // }
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// app.use(cors());

// app.use((req, res, next) => {
  // res.header("Cross-Origin-Embedder-Policy", "*");
  // res.header("Cross-Origin-Opener-Policy", "*");
  
  // res.header("Access-Control-Allow-Headers", "Content-Type",);
  // res.header("Access-Control-Allow-Origin", "https://wetube-muzik.s3.amazonaws.com",);
  // res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET,PUT");

  // res.header("Access-Control-Allow-Origin", "http://localhost:4000'");
  // res.header("Access-Control-Allow-Origin", "https://wetube-muzik.s3.amazonaws.com");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");

  // res.writeHead(200, { "Access-Control-Allow-Origin": "https://wetube-muzik.s3.amazonaws.com" });
  // res.header("Access-Control-Allow-Origin", " https://wetube-muzik.s3.amazonaws.com");
  // next();
// });
// app.use(cors({ origin: "https://wetube-muzik.s3.amazonaws.com" }));

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
