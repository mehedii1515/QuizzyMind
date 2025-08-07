"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = { text: string };

const SignInButton = ({ text }: Props) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("/auth");
      }}
      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
    >
      {text}
    </Button>
  );
};

export default SignInButton;
