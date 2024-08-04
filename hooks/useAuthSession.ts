import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { setUser } from "@/redux/auth/auth.slice";
import _, { rest } from "lodash";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const router = useRouter();

  async function fetchUserData({ token }: { token: string }) {
    //extract data from token
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user`,

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

      if (_.isEmpty(body)) {
        throw new Error("No Data Found");
      }

      const {
        user: { username },
      } = body;

      toast({
        title: "Login Success",
        variant: "success",
      });

      return dispatch(setUser({ username }));
    } catch (error) {
      console.error({ error });
      return;
    }
  }
  useEffect(() => {
    if (token && token.length) {
      fetchUserData({ token });
    }
  }, [token]);

  if (_.isEmpty(user)) {
    return null;
  }
  return { ...user };
};

export default useAuthSession;
