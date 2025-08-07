import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";
type Props = { accuracy: number };

const ResultsCard = ({ accuracy }: Props) => {
  return (
    <Card className="glass-effect shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/90 rounded-xl shadow-sm">
            <Award className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">Overall Results</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        {accuracy > 75 ? (
          <>
            <div className="p-4 bg-warning/20 rounded-full shadow-lg mb-4">
              <Trophy className="h-16 w-16 text-warning" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-warning">Excellent!</div>
              <div className="text-lg font-medium text-foreground">{accuracy.toFixed(1)}% Accuracy</div>
              <div className="text-sm text-muted-foreground">Outstanding performance!</div>
            </div>
          </>
        ) : accuracy > 25 ? (
          <>
            <div className="p-4 bg-info/20 rounded-full shadow-lg mb-4">
              <Trophy className="h-16 w-16 text-info" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-info">Good Job!</div>
              <div className="text-lg font-medium text-foreground">{accuracy.toFixed(1)}% Accuracy</div>
              <div className="text-sm text-muted-foreground">Keep up the great work!</div>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 bg-destructive/20 rounded-full shadow-lg mb-4">
              <Trophy className="h-16 w-16 text-destructive" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-destructive">Keep Trying!</div>
              <div className="text-lg font-medium text-foreground">{accuracy.toFixed(1)}% Accuracy</div>
              <div className="text-sm text-muted-foreground">Practice makes perfect!</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
