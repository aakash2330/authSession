import { profileFormZod, tokenZod } from "@/types/form/Profile";
import _ from "lodash";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";
import getUserTokenAction from "@/actions/getUserToken";
import { verifyTokenAction } from "@/actions/verifyToken";

//get user info from token

export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const parsedData = tokenZod.safeParse({
      token: headersList.get("authorization"),
    });
    if (!parsedData.success) {
      throw new Error(JSON.stringify({ parsedError: parsedData.error }));
    }
    if (_.isEmpty(parsedData.data)) {
      throw new Error("Data is Empty");
    }

    const { username } = await verifyTokenAction({
      authHeader: parsedData.data.token,
    });
    return Response.json({ user: { username } });
  } catch (error) {
    console.error({ error });
    return Response.json({ user: null });
  }
}
