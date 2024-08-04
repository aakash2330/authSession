"use client";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import useAuthSession from "@/hooks/useAuthSession";
import Link from "next/link";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useToast } from "@/components/ui/use-toast";

async function fetchProtectedData({ token }: { token: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/protected/example`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed Response");
  }
  const body = await response.json();
  const data = _.get(body, ["data"]);
  if (_.isEmpty(data)) {
    return null;
  }
  return data;
}

export default function Page() {
  const user = useAuthSession();
  const { toast } = useToast();
  const { token } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex text-black items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div className="flex justify-center items-center flex-col gap-2">
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
            <Button
              onClick={async () => {
                if (token) {
                  const data = await fetchProtectedData({ token });
                  if (data) {
                    return toast({
                      title: "Protected Data Fetched",
                      description: data,
                      variant: "success",
                    });
                  }
                }
                return toast({
                  title: "Protected Data Fetched",
                  description: "Please Login First",
                  variant: "destructive",
                });
              }}
            >
              Protected Route Example
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-2">
            <div>UNAUTHENTICATED</div>
            <Button>
              <Link href={"/"}>Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
