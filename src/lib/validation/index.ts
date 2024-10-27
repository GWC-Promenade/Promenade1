/*
- A collection of form schemas from shacn -> form -> zod
- Used to validate user input (e.g. type checking, length, ...)
*/

import { z } from "zod" // shadcn form

// shadcn form
export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Too short"}),
    username: z.string().min(2, {message: "Too short"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters."})
})

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string()
})

export const PostValidation = z.object({
    caption: z.string().min(1).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(1).max(100),
    tags: z.string(),
    // latitude: z.number(),
    // longitude: z.number()
})