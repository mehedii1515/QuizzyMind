import React from "react";
import Link from "next/link";
import { Github, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-foreground">QuizzyMind</span>
            <span className="text-sm text-muted-foreground">© {currentYear}</span>
          </div>

          {/* Creator Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by</span>
              <Link 
                href="https://github.com/mehedii1515" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Md Mehedi Hasan
              </Link>
            </div>
            
            <Link
              href="https://github.com/mehedii1515"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
