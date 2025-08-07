"use client";
import { Game, Question } from "@prisma/client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "./ui/button";
import { differenceInSeconds } from "date-fns";
import Link from "next/link";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { checkAnswerSchema, endGameSchema } from "@/schemas/questions";
import { cn, formatTimeDelta } from "@/lib/utils";
import MCQCounter from "./MCQCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { useToast } from "./ui/use-toast";

type SerializedGame = {
  id: string;
  userId: string;
  timeStarted: string; // ISO string instead of Date
  topic: string;
  timeEnded: string | null; // ISO string instead of Date
  gameType: "mcq" | "open_ended";
  questions: Pick<Question, "id" | "options" | "question">[];
};

type Props = {
  game: SerializedGame;
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [now, setNow] = React.useState(new Date());

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { toast } = useToast();
  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: options[selectedChoice],
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  const handleNext = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          setStats((stats) => ({
            ...stats,
            correct_answers: stats.correct_answers + 1,
          }));
          toast({
            title: "Correct",
            description: "You got it right!",
            variant: "success",
          });
        } else {
          setStats((stats) => ({
            ...stats,
            wrong_answers: stats.wrong_answers + 1,
          }));
          toast({
            title: "Incorrect",
            description: "You got it wrong!",
            variant: "destructive",
          });
        }
        if (questionIndex === game.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setQuestionIndex((questionIndex) => questionIndex + 1);
      },
    });
  }, [checkAnswer, questionIndex, game.questions.length, toast, endGame]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "1") {
        setSelectedChoice(0);
      } else if (key === "2") {
        setSelectedChoice(1);
      } else if (key === "3") {
        setSelectedChoice(2);
      } else if (key === "4") {
        setSelectedChoice(3);
      } else if (key === "Enter") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (hasEnded) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pastel-full-spectrum min-h-screen">
          <div className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 space-y-6">
            <div className="glass-effect rounded-xl p-8 shadow-xl text-center">
              <div className="p-4 bg-success/90 rounded-xl shadow-sm mb-4 inline-block">
                <BarChart className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Completed!</h2>
              <div className="text-lg text-muted-foreground mb-4">
                You finished in <span className="font-semibold text-foreground">
                  {formatTimeDelta(differenceInSeconds(now, new Date(game.timeStarted)))}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/statistics/${game.id}`}
                  className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 shadow-lg")}
                >
                  <BarChart className="w-5 h-5 mr-2" />
                  View Detailed Results
                </Link>
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "glass-effect hover:bg-background/50")}
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pastel-full-spectrum min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header Section */}
          <div className="glass-effect rounded-xl p-6 shadow-xl mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-medium text-muted-foreground">Topic:</span>
                  <span className="px-3 py-1 text-sm font-semibold text-primary-foreground rounded-lg bg-primary shadow-sm">
                    {game.topic}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Timer className="h-5 w-5" />
                  <span className="font-medium">
                    {formatTimeDelta(differenceInSeconds(now, new Date(game.timeStarted)))}
                  </span>
                </div>
              </div>
              <MCQCounter
                correct_answers={stats.correct_answers}
                wrong_answers={stats.wrong_answers}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="glass-effect shadow-xl mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center justify-center min-w-[60px]">
                  <div className="text-2xl font-bold text-primary">{questionIndex + 1}</div>
                  <div className="text-sm text-muted-foreground border-t border-muted-foreground/30 pt-1 w-full text-center">
                    of {game.questions.length}
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl text-foreground leading-relaxed">
                    {currentQuestion?.question}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {options.map((option, index) => {
              return (
                <Button
                  key={option}
                  variant={selectedChoice === index ? "default" : "outline"}
                  className={`w-full p-6 h-auto text-left justify-start transition-all duration-300 ${
                    selectedChoice === index 
                      ? "bg-primary hover:bg-primary/90 shadow-lg scale-[1.02] border-primary text-primary-foreground" 
                      : "glass-effect hover:bg-primary/10 hover:border-primary/50 hover:scale-[1.01]"
                  }`}
                  onClick={() => setSelectedChoice(index)}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-semibold text-sm transition-colors ${
                      selectedChoice === index 
                        ? "bg-white/20 text-primary-foreground" 
                        : "bg-primary/20 text-primary"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="text-base font-medium flex-1">{option}</div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="flex justify-center">
            <Button
              variant="default"
              size="lg"
              disabled={isChecking || hasEnded}
              onClick={() => {
                handleNext();
              }}
              className="px-8 py-3 text-lg bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
            >
              {isChecking && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {questionIndex === game.questions.length - 1 ? "Finish Quiz" : "Next Question"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQ;
