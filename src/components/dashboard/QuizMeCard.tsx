"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BrainCircuit, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card className="relative overflow-hidden pastel-blue-cream border-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02] group">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-6 right-6 w-24 h-24 bg-primary/10 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-32 h-32 bg-primary/10 rounded-full"></div>
      </div>
      
      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/90 backdrop-blur-sm rounded-xl">
              <BrainCircuit size={32} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">Start Quiz</CardTitle>
              <div className="flex items-center space-x-1 mt-1">
                <Sparkles size={16} className="text-accent" />
                <span className="text-muted-foreground text-sm">AI-Powered Questions</span>
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
          Challenge yourself with AI-generated questions on any topic of your choice. 
          Choose between multiple choice or open-ended formats.
        </p>
        
        <Button 
          onClick={() => router.push("/quiz")}
          variant="secondary"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-primary hover:border-primary/90 transition-all duration-300"
        >
          Create New Quiz
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;
