import z from "zod";
export declare const userSignUp: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    username?: string | undefined;
}, {
    email: string;
    password: string;
    username?: string | undefined;
}>;
export declare const userSignIn: z.ZodObject<Pick<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
}, "email" | "password">, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createPostInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    published: boolean;
}, {
    title: string;
    description: string;
    published: boolean;
}>;
export declare const updatePost: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
}>;
export type userSignUpType = z.infer<typeof userSignUp>;
export type userSignInType = z.infer<typeof userSignIn>;
export type createPostInputType = z.infer<typeof createPostInput>;
export type updatePostType = z.infer<typeof updatePost>;
