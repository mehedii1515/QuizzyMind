import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import HistoryComponent from "../HistoryComponent";
import { prisma } from "@/lib/db";
import { Activity, ArrowRight } from "lucide-react";

type Props = {};

const RecentActivityCard = async (props: Props) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/auth");
  }
  
  const games_count = await prisma.game.count({
    where: {
      userId: user.id,
    },
  });

  return (
    <Card className="pastel-mint-blue border border-primary/20 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4 bg-white/30 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/90 backdrop-blur-sm rounded-xl shadow-sm">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                {games_count === 0 
                  ? "No quizzes completed yet" 
                  : `${games_count} quiz${games_count === 1 ? '' : 'es'} completed`
                }
              </CardDescription>
            </div>
          </div>
          <Link 
            href="/history" 
            className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
          >
            <span className="text-sm mr-1 opacity-0 group-hover:opacity-100 transition-opacity">View All</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-all duration-200" />
          </Link>
        </div>
        
        {/* Activity Stats */}
        {games_count > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 text-center border border-primary/20">
              <div className="text-lg font-bold text-primary">{games_count}</div>
              <div className="text-xs text-muted-foreground">Total Quizzes</div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 text-center border border-success/20">
              <div className="text-lg font-bold text-success">Active</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        {games_count === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-primary/20">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Activity Yet
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Start your learning journey! Create your first quiz and track your progress here.
            </p>
            <Link 
              href="/quiz" 
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              Create First Quiz
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            <div className="p-4">
              <HistoryComponent limit={6} userId={user.id} />
            </div>
            
            {games_count > 6 && (
              <div className="border-t border-white/20 bg-white/20 backdrop-blur-sm p-4 text-center">
                <Link 
                  href="/history"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 inline-flex items-center"
                >
                  View All {games_count} Quizzes
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
