"use client";

import useAuthSession from "../hooks/useAuthSession";
import { ProfileForm } from "@/components/Login/Form";

const HomePage = () => {
  const user = useAuthSession();

  return (
    <div className="flex text-black items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <ProfileForm></ProfileForm>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
