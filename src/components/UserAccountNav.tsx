"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { LogOut, User as UserIcon, BarChart3 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

type Props = {
  user: User;
};

const UserAccountNav = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth'); // Redirect to auth page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <UserAvatar
          className="w-10 h-10 border-2 border-primary/20 hover:border-primary/40 transition-colors"
          user={{
            name: user.name || null,
            image: null, // We don't have images in our simple auth system
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-card border-border shadow-lg" align="end">
        <div className="flex items-center justify-start gap-3 p-4">
          <UserAvatar
            className="w-12 h-12"
            user={{
              name: user.name || null,
            }}
          />
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && (
              <p className="font-semibold text-foreground">{user.name}</p>
            )}
            {user.email && (
              <p className="w-[180px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center cursor-pointer">
            <UserIcon className="w-4 h-4 mr-3" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/history" className="flex items-center cursor-pointer">
            <BarChart3 className="w-4 h-4 mr-3" />
            Quiz History
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            handleLogout();
          }}
          className="text-destructive hover:text-destructive cursor-pointer focus:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
