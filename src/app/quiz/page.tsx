import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import QuizCreation from "@/components/forms/QuizCreation";

export const metadata = {
  title: "Quiz | QuizzyMind",
  description: "Quiz yourself on anything!",
};

// Force this page to be dynamically rendered
export const dynamic = 'force-dynamic';

type Props = {};

interface Props {
  searchParams: {
    topic?: string;
  };
}

const Quiz = async ({ searchParams }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <QuizCreation topic={searchParams.topic ?? ""} />
      </div>
    </div>
  );
};

export default Quiz;
