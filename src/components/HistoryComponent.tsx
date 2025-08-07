import { prisma } from "@/lib/db";
import { Clock, CopyCheck, Edit2, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";
import MCQCounter from "./MCQCounter";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: "desc",
    },
  });

  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="p-6 pastel-mint-blue rounded-xl inline-block mb-4 border border-primary/20">
          <Clock className="h-12 w-12 text-primary mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Quiz History Yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          You haven't taken any quizzes yet. Start your learning journey by creating your first quiz!
        </p>
        <Link href="/quiz" className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Create Your First Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {games.map((game, index) => {
        const isRecent = index < 3;
        const gameDate = new Date(game.timeEnded ?? game.timeStarted);
        const isToday = gameDate.toDateString() === new Date().toDateString();
        const isThisWeek = (Date.now() - gameDate.getTime()) / (1000 * 60 * 60 * 24) < 7;
        
        return (
          <div 
            className={`group p-5 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              isRecent 
                ? 'pastel-blue-cream border-primary/20 hover:shadow-primary/20' 
                : 'bg-card border-border hover:shadow-lg'
            }`}
            key={game.id}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Game Type Icon */}
                <div className={`p-3 rounded-xl shadow-sm backdrop-blur-sm ${
                  game.gameType === "mcq" 
                    ? 'bg-success/90' 
                    : 'bg-warning/90'
                }`}>
                  {game.gameType === "mcq" ? (
                    <CopyCheck className="h-5 w-5 text-white" />
                  ) : (
                    <Edit2 className="h-5 w-5 text-white" />
                  )}
                </div>
                
                {/* Game Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <Link
                      className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 truncate group-hover:underline"
                      href={`/statistics/${game.id}`}
                    >
                      {game.topic}
                    </Link>
                    
                    {/* Status Badges */}
                    <div className="flex items-center space-x-2">
                      {isToday && (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                          Today
                        </span>
                      )}
                      {isRecent && !isToday && (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full border border-accent/30">
                          Recent
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Game Details */}
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{gameDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: gameDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                      })}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{gameDate.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}</span>
                    </div>
                    
                    <div className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${
                      game.gameType === "mcq" 
                        ? 'bg-success/20 text-success border-success/30' 
                        : 'bg-warning/20 text-warning border-warning/30'
                    }`}>
                      {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Indicator */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
