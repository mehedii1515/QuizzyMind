import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type AvatarProps } from "@radix-ui/react-avatar";

interface Props extends AvatarProps {
  user: {
    name: string | null;
  };
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
      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
        {getInitials(user?.name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
