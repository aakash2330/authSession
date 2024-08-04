import { profileFormZod, tokenZod } from "@/types/form/Profile";
import _ from "lodash";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { verifyTokenAction } from "@/actions/verifyToken";

//example protected Route

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
    if (username && username.length) {
      return Response.json({ data: "PROTECTD DATA FETCHED" });
    }
  } catch (error) {
    console.error({ error });
    return Response.json({ data: null });
  }
}
