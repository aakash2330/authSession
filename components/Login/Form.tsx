"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/store";
import _ from "lodash";
import getUserTokenAction from "@/actions/getUserToken";
import { profileFormZod } from "@/types/form/Profile";
import { setToken } from "@/redux/auth/auth.slice";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export function ProfileForm() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof profileFormZod>>({
    resolver: zodResolver(profileFormZod),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleLogin(values: z.infer<typeof profileFormZod>) {
    const { username, password } = values;

    try {
      const { token } = await getUserTokenAction({ username, password });
      if (_.isEmpty(token)) {
        toast({
          title: "Unable To Login",
          description: "Invaid Credentials",
          variant: "destructive",
        });
        throw new Error("No User Data");
      }
      dispatch(setToken(token!));
      router.push("/user");
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full px-4 py-2 mt-4 border rounded-md"
                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full px-4 py-2 mt-4 border rounded-md"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md">
          Login
        </button>
      </form>
    </Form>
  );
}
