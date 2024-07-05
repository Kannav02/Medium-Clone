import { Context } from "hono";
import { sign } from "hono/utils/jwt/jwt";
import { userSignIn,userSignUp,userSignInType,userSignUpType } from "@kannav02/common";

export const userSignUpController=async(c:Context)=>{
    const body:userSignUpType=await c.req.json()
    const {email,username,password}=body
    if(!userSignUp.safeParse({email,username,password}).success){
        return c.json({mssg:"invald input have been sent"},401)
    }
    const prisma=c.get("prisma")
    try{
    const doesUserExist=await prisma.user.findUnique({
        where:{
            email
        },
        select:{
            id:true
        }
    })
    if(doesUserExist){
        return c.json({mssg:"the user already exists"},400)
    }

    const response=await prisma.user.create({
        data:{
            email,
            password,
            name:username || null
            },
        select:{
            id:true
            }
        })
        const token=await sign({userId:response.id},c.env.JWT_PASSWORD)
        return c.json({mssg:"user successfully created",token})
    }


    catch(e){
        return  c.json({mssg:"Unknown error occurred"},500)
    }


}

export const userSignInController=async(c:Context)=>{
    const body:userSignInType=await c.req.json()
    const {email,password}=body
    if(!userSignIn.safeParse({email,password}).success){
        return c.json({mssg:"wrong inputs have been sent"},411)
    }
    const prisma=c.get("prisma")
    try{
        const doesUserExist=await prisma.user.findFirst({
            where:{
                email,
                password
            },
            select:{
                id:true
            }
        })
        if(!doesUserExist){
            return c.json({mssg:"the user doesn't exist"},400)
        }
        const token=await sign({userId:doesUserExist.id},c.env.JWT_PASSWORD)
        return c.json({mssg:"the user has been created",token},200)
    }
    catch(e){
        return c.json({mssg:"unknown error occurred"},500)
    }




}