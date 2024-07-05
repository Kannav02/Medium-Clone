import { Hono } from "hono"
import { getBlog,getBlogs,makeBlog,updateBlog } from "../controllers/blogController"


const postRouter=new Hono<{Variables:{
    userId:string
}}>


postRouter.get("/bulk",getBlogs)
postRouter.get("/:id",getBlog)
postRouter.post("/",makeBlog)
postRouter.put("/",updateBlog)


export default postRouter