import OpenEnded from "@/components/OpenEnded";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
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
          answer: true,
        },
      },
    },
  });
  if (!game || game.gameType === "mcq") {
    return redirect("/quiz");
  }
  
  // Serialize the game data to avoid server component serialization issues
  const serializedGame = {
    ...game,
    timeStarted: game.timeStarted.toISOString(),
    timeEnded: game.timeEnded?.toISOString() || null,
  };
  
  return <OpenEnded game={serializedGame} />;
};

export default OpenEndedPage;
