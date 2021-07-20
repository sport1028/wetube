import express from "express";
import {join, login} from "../controller/userController";
import {trending} from "../controller/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/login", login);
globalRouter.get("/join", join);

export default globalRouter;