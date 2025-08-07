import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
type Props = { accuracy: number };

const AccuracyCard = ({ accuracy }: Props) => {
  accuracy = Math.round(accuracy * 100) / 100;
  return (
    <Card className="glass-effect shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-success/90 rounded-xl shadow-sm">
            <Target className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">Accuracy</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-success">{accuracy.toString()}%</div>
          <div className="text-sm text-muted-foreground">Overall Performance</div>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-3 mt-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-success to-success/80 transition-all duration-1000 rounded-full shadow-sm"
            style={{ width: `${Math.min(accuracy, 100)}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
