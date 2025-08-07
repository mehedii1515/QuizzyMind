import DetailsDialog from "@/components/DetailsDialog";
import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicsCard from "@/components/dashboard/HotTopicsCard";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/db";

type Props = {};

export const metadata = {
  title: "Dashboard | QuizzyMind",
  description: "Quiz yourself on anything!",
};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  // Get user stats for dashboard
  const [gamesCount, recentGames] = await Promise.all([
    prisma.game.count({
      where: { userId: session.user.id },
    }),
    prisma.game.findMany({
      where: { userId: session.user.id },
      orderBy: { timeStarted: "desc" },
      take: 5,
      include: {
        questions: {
          select: {
            isCorrect: true,
          },
        },
      },
    }),
  ]);

  const totalCorrect = recentGames.reduce((acc, game) => {
    return acc + game.questions.filter((q) => q.isCorrect === true).length;
  }, 0);

  const totalQuestions = recentGames.reduce((acc, game) => {
    return acc + game.questions.length;
  }, 0);

  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Welcome back, {session.user.name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to challenge yourself today?
            </p>
          </div>
          <DetailsDialog />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="pastel-mint-blue rounded-xl p-6 shadow-lg border border-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/30 backdrop-blur-sm rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{gamesCount}</p>
                <p className="text-sm text-muted-foreground">Quizzes Completed</p>
              </div>
            </div>
          </div>
          
          <div className="pastel-blue-cream rounded-xl p-6 shadow-lg border border-success/20 hover:shadow-xl hover:shadow-success/25 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/30 backdrop-blur-sm rounded-lg">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
                <p className="text-sm text-muted-foreground">Recent Accuracy</p>
              </div>
            </div>
          </div>
          
          <div className="pastel-cream-peach rounded-xl p-6 shadow-lg border border-accent/20 hover:shadow-xl hover:shadow-accent/25 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/30 backdrop-blur-sm rounded-lg">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalQuestions}</p>
                <p className="text-sm text-muted-foreground">Questions Answered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <QuizMeCard />
          <HistoryCard />
        </div>

        {/* Secondary Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8">
            <HotTopicsCard />
          </div>
          <div className="xl:col-span-4">
            <RecentActivityCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
