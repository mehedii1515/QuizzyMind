"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { History, ArrowRight, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

const HistoryCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card className="relative overflow-hidden pastel-cream-peach border-accent/20 hover:shadow-xl hover:shadow-accent/25 transition-all duration-300 hover:scale-[1.02] group">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-accent/10 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-24 h-24 bg-accent/10 rounded-full"></div>
      </div>
      
      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent/90 backdrop-blur-sm rounded-xl">
              <History size={32} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">Quiz History</CardTitle>
              <div className="flex items-center space-x-1 mt-1">
                <BarChart3 size={16} className="text-accent" />
                <span className="text-muted-foreground text-sm">Track Progress</span>
              </div>
            </div>
          </div>
          <ArrowRight 
            size={24} 
            className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" 
          />
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <p className="text-muted-foreground mb-6 text-base leading-relaxed">
          Review your past quiz attempts, analyze your performance, and track your learning progress over time.
        </p>
        
        <Button 
          onClick={() => router.push("/history")}
          variant="secondary"
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-accent hover:border-accent/90 transition-all duration-300"
        >
          <Clock size={16} className="mr-2" />
          View History
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
