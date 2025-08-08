import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { LucideLayoutDashboard, BarChart } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";
import ResultsCard from "@/components/statistics/ResultsCard";
import AccuracyCard from "@/components/statistics/AccuracyCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import QuestionsList from "@/components/statistics/QuestionsList";

type Props = {
  params: {
    gameId: string;
  };
};

const Statistics = async ({ params: { gameId } }: Props) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/auth");
  }
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { questions: true },
  });
  if (!game) {
    return redirect("/");
  }

  let accuracy: number = 0;

  if (game.gameType === "mcq") {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.gameType === "open_ended") {
    let totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect ?? 0);
    }, 0);
    accuracy = totalPercentage / game.questions.length;
  }
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="pastel-full-spectrum min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Section */}
          <div className="glass-effect rounded-xl p-6 shadow-xl mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/90 rounded-xl shadow-sm">
                  <BarChart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Quiz Results</h1>
                  <p className="text-muted-foreground text-lg">Performance Summary for "{game.topic}"</p>
                </div>
              </div>
              <Link 
                href="/dashboard" 
                className={`${buttonVariants({ variant: "outline", size: "lg" })} glass-effect hover:bg-background/50 transition-all duration-300 shadow-sm`}
              >
                <LucideLayoutDashboard className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Statistics Cards Grid */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <ResultsCard accuracy={accuracy} />
            <AccuracyCard accuracy={accuracy} />
            <TimeTakenCard
              timeEnded={new Date(game.timeEnded ?? 0)}
              timeStarted={new Date(game.timeStarted ?? 0)}
            />
          </div>
          
          {/* Questions List */}
          <QuestionsList questions={game.questions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
