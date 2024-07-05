import { Context } from "hono";
import { createPostInput,createPostInputType,updatePost,updatePostType} from "@kannav02/common";



export const makeBlog=async(c:Context)=>{
    const body:createPostInputType=await c.req.json()
    console.log(body)
    const {title,description,published}=body
    if(!createPostInput.safeParse({title,description,published}).success){
        return c.json({mssg:"wrong inputs have been sent"},411)
    }
    const userId=c.get("userId")
    console.log(userId)
    const prisma=c.get("prisma")
    try{
        const response=await prisma.blog.create({
            data:{
                title,
                published,
                description,
                authorId:userId.userId
            },
            select:{
                id:true

            }
        })
    return c.json({mssg:"the blog has been created",id:response.id},200)
    }

    catch(e){
        console.log(e)
        return c.json({mssg:"unexpected error has occured"},500)
    }

}

export const updateBlog=async(c:Context)=>{
    const body:updatePostType=await c.req.json()
    const userId=c.get("userId")
    const {id,title,description}=body
    if(!updatePost.safeParse({id,title,description}).success){
        return c.json({mssg:"wrong inputs have been sent"},411)
    }
    const prisma=c.get("prisma")

    try{
        const response=await prisma.blog.update({
            where:{
                id:id,
                authorId:userId.userId
            },
            data:{
                title,
                description
            }
        })

        return c.json({mssg:"the record has been made"},200)
    }
    catch(e){
        return c.json({mssg:"unexpected internal server error occured"},500)

    }
}

export const getBlog=async(c:Context)=>{
    const id=c.req.param("id")
    const userId=c.get("userId")
    const prisma=c.get("prisma")

    try{
        const response=await prisma.blog.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                title:true,
                description:true,
                timePublished:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({mssg:"get this blog",blog:response})
    }
    catch(e){

        return c.json({mssg:"unexpected error has occured"},500)

    }
}


export const getBlogs=async(c:Context)=>{
    const userId=c.get("userId")
    const prisma=c.get("prisma")
    try{
        const response=await prisma.blog.findMany({
            select:{
                id:true,
                title:true,
                description:true,
                published:true,
                timePublished:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return c.json({mssg:"successful",posts:response},200)
    }
    catch(e){
        return c.json({mssg:"unexpected error has occured"},500)
    }

}