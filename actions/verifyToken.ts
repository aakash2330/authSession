"use server";

import jwt from "jsonwebtoken";

export  async function verifyTokenAction({
  authHeader,
}: {
  authHeader: string;
}) {
  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      throw new Error("Invalid JWT token");
    }

    const { username } = decoded;
    return { username };
  } catch (error) {
    console.error({ error });
    return { username: null };
  }
}
