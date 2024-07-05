import { Context,Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware=async(c:Context,next:Next)=>{
    const authHeader=c.req.header("Authorization")

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return c.json({mssg:"the user doesn't have the authentication to access this page"},403)
    }
    try{
        const token=authHeader.split(" ")[1]
        const decoded=await verify(token,c.env.JWT_PASSWORD)
        if(decoded!=null && decoded!=undefined){
            c.set("userId",decoded)
            await next()
        }

    }
    catch(e){
        return c.json({mssg:"internal server error occurred"},500)
    }
}