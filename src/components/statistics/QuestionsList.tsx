"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@prisma/client";
import { FileText, CheckCircle, XCircle } from "lucide-react";
type Props = {
  questions: Question[];
};

const QuestionsList = ({ questions }: Props) => {
  return (
    <Card className="glass-effect shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-info/90 rounded-xl shadow-sm">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">Question Review</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/20">
              <TableHead className="text-foreground font-semibold">No.</TableHead>
              <TableHead className="text-foreground font-semibold">Question & Correct Answer</TableHead>
              <TableHead className="text-foreground font-semibold">Your Answer</TableHead>
              {questions[0]?.questionType === "open_ended" && (
                <TableHead className="text-right text-foreground font-semibold">Accuracy</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map(
              ({ answer, question, userAnswer, percentageCorrect, isCorrect }, index) => {
                return (
                  <TableRow key={index} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      <div className="space-y-2">
                        <div className="font-medium">{question}</div>
                        <div className="bg-success/10 rounded-lg p-3 border border-success/20">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="font-semibold text-success">Correct Answer:</span>
                          </div>
                          <div className="text-foreground mt-1">{answer}</div>
                        </div>
                      </div>
                    </TableCell>
                    {questions[0]?.questionType === "open_ended" ? (
                      <TableCell>
                        <div className="bg-info/10 rounded-lg p-3 border border-info/20">
                          <div className="flex items-center space-x-2 mb-1">
                            <FileText className="h-4 w-4 text-info" />
                            <span className="font-semibold text-info">Your Response:</span>
                          </div>
                          <div className="text-foreground">{userAnswer}</div>
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <div className={`rounded-lg p-3 border ${
                          isCorrect 
                            ? "bg-success/10 border-success/20" 
                            : "bg-destructive/10 border-destructive/20"
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            {isCorrect ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <XCircle className="h-4 w-4 text-destructive" />
                            )}
                            <span className={`font-semibold ${
                              isCorrect ? "text-success" : "text-destructive"
                            }`}>
                              Your Answer:
                            </span>
                          </div>
                          <div className="text-foreground">{userAnswer}</div>
                        </div>
                      </TableCell>
                    )}
                    {percentageCorrect && (
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end space-y-1">
                          <div className="text-2xl font-bold text-info">{percentageCorrect}%</div>
                          <div className="w-16 bg-muted/30 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-info to-info/80 transition-all duration-1000 rounded-full"
                              style={{ width: `${Math.min(percentageCorrect, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default QuestionsList;
