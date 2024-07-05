import z from "zod"

export const userSignUp=z.object({
    email:z.string().email(),
    password:z.string().min(8),
    username:z.string().optional()
})

export const userSignIn=userSignUp.pick({
    email:true,
    password:true
})

export const createPostInput=z.object({
    title:z.string(),
    description:z.string(),
    published:z.boolean()
})

export const updatePost=z.object({
    id:z.string(),
    title:z.string().optional(),
    description:z.string().optional()
})




export type userSignUpType=z.infer<typeof userSignUp>
export type userSignInType=z.infer<typeof userSignIn>
export type createPostInputType=z.infer<typeof createPostInput>
export type updatePostType=z.infer<typeof updatePost>