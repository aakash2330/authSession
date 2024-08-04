
import {z} from "zod"

export const profileFormZod = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});


export const tokenZod = z.object({
  token: z.string().min(1),
});
