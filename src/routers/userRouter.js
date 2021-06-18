import express from "express";
import {edit, remove, logout, see} from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/id", see);

export default userRouter;