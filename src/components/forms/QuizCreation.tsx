"use client"

import { quizCreationSchema } from "@/schemas/forms/quiz";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, CopyCheck, ArrowLeft, Brain, Hash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  topic?: string;
};

type Input = z.infer<typeof quizCreationSchema>;

const QuizCreation = ({ topic }: Props) => {
  const router = useRouter();
  const { mutate: getQuestions, isPending } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await axios.post("/api/game", { amount, topic, type });
      return response.data;
    },
    onSuccess: ({ gameId }: { gameId: string }) => {
      // The type is single or multiple but we need to convert it to something else
      // single -> open-ended
      // multiple -> mcq
      const type = form.getValues("type");
      if (type === "mcq") {
        router.push(`/play/mcq/${gameId}`);
      } else if (type === "open_ended") {
        router.push(`/play/open-ended/${gameId}`);
      }
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: topic || "",
      type: "mcq",
      amount: 3,
    },
  });

  const onSubmit = async (data: Input) => {
    getQuestions(data);
  };

  form.watch();

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      {/* Header Section */}
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4">
          <Link href="/dashboard" className="order-2 sm:order-1">
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-3 order-1 sm:order-2">
            <div className="p-2 sm:p-3 bg-primary/90 rounded-xl shadow-sm">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="text-left sm:text-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Create Quiz</h1>
              <p className="text-sm sm:text-base text-muted-foreground hidden sm:block">Design your perfect learning experience</p>
            </div>
          </div>
          <div className="hidden sm:block w-20 order-3"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Form Card */}
      <Card className="pastel-full-spectrum border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <CardHeader className="glass-effect border-b border-border/20 text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Quiz Configuration
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize your quiz settings below
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Quiz Topic
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter a topic (e.g., JavaScript, History, Science)" 
                        {...field} 
                        className="h-14 glass-effect text-lg placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-background/50 transition-all duration-300"
                      />
                    </FormControl>
                    <FormDescription className="text-muted-foreground">
                      Enter any topic you'd like to test your knowledge on
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Hash className="w-5 h-5" />
                      Number of Questions
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How many questions?"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                        min={1}
                        max={10}
                        className="h-14 glass-effect text-lg focus:border-primary/50 focus:bg-background/50 transition-all duration-300"
                      />
                    </FormControl>
                    <FormDescription className="text-muted-foreground">
                      Choose between 1 and 10 questions for your quiz
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 text-center flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5" />
                  Choose Quiz Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                      form.getValues("type") === "mcq"
                        ? "border-primary bg-primary/20 glass-effect shadow-lg scale-[1.02]"
                        : "glass-effect hover:border-primary/50 hover:bg-primary/10 hover:scale-[1.02]"
                    }`}
                    onClick={() => form.setValue("type", "mcq")}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-success/90 rounded-xl shadow-sm">
                        <CopyCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-foreground">Multiple Choice</h4>
                        <p className="text-sm text-muted-foreground">Select from multiple options</p>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground">
                      Perfect for quick knowledge checks and assessments
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                      form.getValues("type") === "open_ended"
                        ? "border-primary bg-primary/20 glass-effect shadow-lg scale-[1.02]"
                        : "glass-effect hover:border-primary/50 hover:bg-primary/10 hover:scale-[1.02]"
                    }`}
                    onClick={() => form.setValue("type", "open_ended")}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-warning/90 rounded-xl shadow-sm">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-foreground">Open Ended</h4>
                        <p className="text-sm text-muted-foreground">Write detailed answers</p>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground">
                      Great for deeper understanding and explanations
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                disabled={isPending} 
                type="submit" 
                size="lg" 
                className="w-full h-12 sm:h-16 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold touch-manipulation"
              >
                {isPending ? "Generating Quiz..." : "Create Quiz"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
