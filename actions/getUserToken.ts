"use server";
import jwt from "jsonwebtoken";
export default async function getUserTokenAction({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    if (username == "admin" && password == "admin") {
      const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      return { token };
    }
    throw new Error("Invalid Credentials");
  } catch (error) {
    console.error({ error });
    return { token: null };
  }
}
