import { Hono } from 'hono'
import userRouter from './routers/userRouter'
import blogRouter from "./routers/blogRouter"
import { cors } from 'hono/cors'
import { authMiddleware } from './middlewares/authMiddleware'
import { prismaMiddleware } from './middlewares/prismaMiddleware'

const app = new Hono<{
  Bindings:{
    JWT_SECRET:string
    DATABASE_URL:string
  }
}>

app.use("*",cors())
app.use("*",prismaMiddleware)
app.use("/api/v1/blog/*",authMiddleware)

app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)


export default app