import HistoryComponent from "@/components/HistoryComponent";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, ArrowLeft, Clock, TrendingUp } from "lucide-react";

type Props = {};

const History = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/90 backdrop-blur-sm rounded-xl">
                <HistoryIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Quiz History</h1>
                <p className="text-muted-foreground mt-1">
                  Track your quiz performance and progress over time
                </p>
              </div>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="pastel-mint-blue border-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/30 backdrop-blur-sm rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {/* This will be populated by HistoryComponent stats */}
                      --
                    </p>
                    <p className="text-sm text-muted-foreground">Total Quizzes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="pastel-blue-cream border-accent/20 hover:shadow-xl hover:shadow-accent/25 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/30 backdrop-blur-sm rounded-lg">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {/* This will show recent activity */}
                      This Week
                    </p>
                    <p className="text-sm text-muted-foreground">Recent Activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="pastel-cream-peach border-success/20 hover:shadow-xl hover:shadow-success/25 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/30 backdrop-blur-sm rounded-lg">
                    <HistoryIcon className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      Growing
                    </p>
                    <p className="text-sm text-muted-foreground">Learning Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* History Content */}
        <Card className="pastel-full-spectrum shadow-xl hover:shadow-2xl transition-all duration-300 border-primary/20">
          <CardHeader className="border-b bg-white/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Quiz History</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  View your quiz attempts and performance details
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="p-6">
                <HistoryComponent limit={50} userId={session.user.id} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;
