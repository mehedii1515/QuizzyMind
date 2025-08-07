"use client";
import { cn, formatTimeDelta } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "./ui/button";
import OpenEndedPercentage from "./OpenEndedPercentage";
import BlankAnswerInput from "./BlankAnswerInput";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { checkAnswerSchema, endGameSchema } from "@/schemas/questions";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

type SerializedGame = {
  id: string;
  userId: string;
  timeStarted: string; // ISO string instead of Date
  topic: string;
  timeEnded: string | null; // ISO string instead of Date
  gameType: "mcq" | "open_ended";
  questions: Pick<Question, "id" | "question" | "answer">[];
};

type Props = {
  game: SerializedGame;
};

const OpenEnded = ({ game }: Props) => {
  const [hasEnded, setHasEnded] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [blankAnswer, setBlankAnswer] = React.useState("");
  const [averagePercentage, setAveragePercentage] = React.useState(0);
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);
  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });
  const { toast } = useToast();
  const [now, setNow] = React.useState(new Date());
  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll<HTMLInputElement>("#user-blank-input").forEach((input) => {
        filledAnswer = filledAnswer.replace("_____", input.value);
        input.value = "";
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: filledAnswer,
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });
  React.useEffect(() => {
    if (!hasEnded) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasEnded]);

  const handleNext = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% similar to the correct answer`,
        });
        setAveragePercentage((prev) => {
          return (prev + percentageSimilar) / (questionIndex + 1);
        });
        if (questionIndex === game.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }, [checkAnswer, questionIndex, toast, endGame, game.questions.length]);
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "Enter") {
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
              <OpenEndedPercentage percentage={averagePercentage} />
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

          {/* Answer Input Section */}
          <div className="glass-effect rounded-xl p-6 shadow-lg mb-6">
            <BlankAnswerInput
              setBlankAnswer={setBlankAnswer}
              answer={currentQuestion.answer}
            />
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

export default OpenEnded;
