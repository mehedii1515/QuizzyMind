import Link from "next/link";
import React from "react";

import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Brain, Home, History, Trophy, Plus } from "lucide-react";

const Navbar = () => {
  const navigationItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Create Quiz", 
      href: "/quiz",
      icon: Plus,
    },
    {
      label: "History",
      href: "/history", 
      icon: History,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Trophy,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                QuizzyMind
              </h1>
              <p className="text-[10px] text-muted-foreground leading-none">AI-Powered Quizzes</p>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Bottom Border Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </header>
  );
};

export default Navbar;
