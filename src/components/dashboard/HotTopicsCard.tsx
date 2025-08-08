import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { TrendingUp, Flame, ArrowRight, BarChart3, Users, Clock } from "lucide-react";
import Link from "next/link";

type Props = {};

const HotTopicsCard = async (props: Props) => {
  const topics = await prisma.topicCount.findMany({
    orderBy: {
      count: 'desc'
    },
    take: 12 // Show top 12 topics for better layout
  });
  
  const totalQuizzes = topics.reduce((sum, topic) => sum + topic.count, 0);
  const topTopic = topics[0];

  // Calculate percentage for each topic
  const topicsWithPercentage = topics.map((topic) => ({
    ...topic,
    percentage: totalQuizzes > 0 ? Math.round((topic.count / totalQuizzes) * 100) : 0
  }));

  return (
    <Card className="pastel-full-spectrum border border-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4 bg-white/30 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/90 backdrop-blur-sm rounded-xl shadow-sm">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Trending Topics
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Most popular quiz subjects this week
              </CardDescription>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              <span>{totalQuizzes} total</span>
            </div>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 text-center border border-primary/20">
            <div className="text-lg font-bold text-primary">{topics.length}</div>
            <div className="text-xs text-muted-foreground">Active Topics</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 text-center border border-accent/20">
            <div className="text-lg font-bold text-accent">{topTopic?.count || 0}</div>
            <div className="text-xs text-muted-foreground">Top Score</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 text-center border border-success/20">
            <div className="text-lg font-bold text-success">{totalQuizzes}</div>
            <div className="text-xs text-muted-foreground">Total Quizzes</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {topicsWithPercentage.length > 0 ? (
          <div className="space-y-0">
            {topicsWithPercentage.slice(0, 8).map((topic, index) => (
              <Link 
                key={topic.topic} 
                href={`/quiz?topic=${encodeURIComponent(topic.topic)}`}
                className="block hover:bg-white/20 hover:backdrop-blur-sm transition-all duration-300"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/20 last:border-b-0">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-semibold text-primary border border-primary/30">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground truncate capitalize">
                        {topic.topic}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-24 h-2 bg-white/30 backdrop-blur-sm rounded-full overflow-hidden border border-white/20">
                          <div 
                            className="h-full bg-gradient-to-r from-primary via-accent to-success transition-all duration-500"
                            style={{ width: `${Math.min(topic.percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {topic.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {topic.count}
                        </span>
                      </div>
                      <Badge 
                        variant={index < 3 ? "default" : "secondary"} 
                        className="mt-1 text-xs h-5"
                      >
                        {index < 3 && <Flame className="h-2.5 w-2.5 mr-1" />}
                        {index === 0 ? "Hot" : index === 1 ? "Rising" : index === 2 ? "Popular" : "Active"}
                      </Badge>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No trending topics yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Create your first quiz to start discovering popular topics and join the learning community.
            </p>
            <Link href="/quiz">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Create First Quiz
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
