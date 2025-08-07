import { type User } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { type AvatarProps } from "@radix-ui/react-avatar";

interface Props extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar = ({ user, ...props }: Props) => {
  // Function to get initials from name
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
            className="object-cover"
          />
        </div>
      ) : (
        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
          {getInitials(user?.name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
