"use client";
import Appbar from "@/app/components/Appbar";
import Bottom from "@/app/components/Bottom";
import Drawer from "@/app/components/Drawer";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleMenuToggle = () => setIsDrawerOpen(!isDrawerOpen);
  const redirectToProfile = () => router.push("/profile/complete-profile");
  const handleSignOut = () => signOut();

  const buttonClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full";

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle} />
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle} />
      {session ? (
        <>
          <h2>
            Logado como: {session.user.name}, e-mail: {session.user.email}
          </h2>
          <button className={buttonClass} onClick={redirectToProfile}>
            Complete your profile
          </button>
          <button className={buttonClass} onClick={handleSignOut}>
            Sign out
          </button>
        </>
      ) : (
        <>
          <h2>You are not signed in!</h2>
          <button className={buttonClass} onClick={() => signIn("google")}>
            Sign in
          </button>
        </>
      )}
      <Bottom />
    </main>
  );
};

export default LoginPage;
