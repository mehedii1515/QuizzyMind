import MCQ from "@/components/MCQ";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const MCQPage = async ({ params: { gameId } }: Props) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/auth");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });
  if (!game || game.gameType === "open_ended") {
    return redirect("/quiz");
  }
  
  // Serialize the game data to avoid server component serialization issues
  const serializedGame = {
    ...game,
    timeStarted: game.timeStarted.toISOString(),
    timeEnded: game.timeEnded?.toISOString() || null,
  };
  
  return <MCQ game={serializedGame} />;
};

export default MCQPage;
