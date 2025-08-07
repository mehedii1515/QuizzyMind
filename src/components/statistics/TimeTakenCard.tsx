import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hourglass } from "lucide-react";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = {
  timeEnded: Date;
  timeStarted: Date;
};

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => {
  const timeTaken = differenceInSeconds(timeEnded, timeStarted);
  const timeString = formatTimeDelta(timeTaken);
  
  return (
    <Card className="glass-effect shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-warning/90 rounded-xl shadow-sm">
            <Hourglass className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">Time Taken</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-warning">{timeString}</div>
          <div className="text-sm text-muted-foreground">Total Duration</div>
        </div>
        <div className="mt-4 flex items-center space-x-2 text-xs text-muted-foreground">
          <span>⏱️ Avg: {Math.round(timeTaken / 5)} sec/question</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;
