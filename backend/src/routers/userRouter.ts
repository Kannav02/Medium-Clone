import { Hono } from "hono";
import { userSignInController,userSignUpController } from "../controllers/userController";

const userRouter=new Hono()


userRouter.post("/signup",userSignUpController)
userRouter.post("/signin",userSignInController)

export default userRouter
