import express from "express";
import {join} from "../controller/userController";
import {trending, search} from "../controller/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/search", search);

export default globalRouter;