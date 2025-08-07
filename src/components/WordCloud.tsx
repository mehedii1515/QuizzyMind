"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import D3WordCloud to prevent SSR issues
const D3WordCloud = dynamic(() => import("react-d3-cloud"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[480px] bg-card rounded-lg border border-border">
      <div className="text-center">
        <div className="animate-pulse bg-muted rounded-full w-8 h-8 mx-auto mb-2"></div>
        <div className="text-muted-foreground text-sm">Loading word cloud...</div>
      </div>
    </div>
  ),
});

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const WordCloud = ({ formattedTopics }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize the font size function to prevent recalculation
  const fontSizeMapper = useMemo(() => {
    return (word: { value: number }) => {
      const minSize = 14;
      const maxSize = 48;
      return Math.max(minSize, Math.min(maxSize, Math.log2(word.value) * 8 + 16));
    };
  }, []);

  // Create stable rotation values for each word based on text hash
  const getStableRotation = useMemo(() => {
    return (text: string) => {
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return (hash % 61) - 30; // -30 to 30 degrees
    };
  }, []);

  // Memoized color function
  const getTopicColor = useMemo(() => {
    const colors = [
      'hsl(195, 85%, 35%)',    // Primary teal-blue
      'hsl(250, 75%, 60%)',    // Accent purple-blue
      'hsl(145, 65%, 42%)',    // Success green
      'hsl(25, 85%, 55%)',     // Warning orange
      'hsl(185, 75%, 45%)',    // Light primary
      'hsl(260, 80%, 65%)',    // Light accent
      'hsl(155, 60%, 50%)',    // Light success
      'hsl(35, 80%, 60%)',     // Light warning
    ];

    return (text: string, isHovered: boolean) => {
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
      }
      const colorIndex = Math.abs(hash) % colors.length;
      
      if (theme.theme === "dark") {
        return isHovered ? "hsl(210, 15%, 92%)" : colors[colorIndex];
      }
      return isHovered ? "hsl(215, 25%, 15%)" : colors[colorIndex];
    };
  }, [theme.theme]);

  // Memoize the word cloud data to prevent recalculation
  const memoizedData = useMemo(() => {
    return formattedTopics.map((topic) => ({
      ...topic,
      // Add stable properties to prevent recalculation
      rotation: getStableRotation(topic.text),
      baseColor: getTopicColor(topic.text, false),
    }));
  }, [formattedTopics, getStableRotation, getTopicColor]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-[480px] bg-card rounded-lg border border-border">
        <div className="text-center">
          <div className="animate-pulse bg-muted rounded-full w-8 h-8 mx-auto mb-2"></div>
          <div className="text-muted-foreground text-sm">Loading word cloud...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <D3WordCloud
        data={memoizedData}
        height={480}
        font="Inter, system-ui, sans-serif"
        fontSize={fontSizeMapper}
        rotate={(d) => d.rotation} // Use pre-calculated stable rotation
        padding={15}
        fill={(d) => getTopicColor(d.text, hoveredWord === d.text)}
        onWordClick={(e, d) => {
          router.push("/quiz?topic=" + d.text);
        }}
        onWordMouseOver={(e, d) => {
          setHoveredWord(d.text);
          // Only change visual appearance, not position
          e.target.style.cursor = 'pointer';
          e.target.style.opacity = '0.8';
        }}
        onWordMouseOut={(e, d) => {
          setHoveredWord(null);
          e.target.style.opacity = '1';
        }}
        spiral="archimedean"
        random={() => 0.5} // Fixed seed for consistent positioning
        // Disable word cloud recalculation on updates
        key={`wordcloud-${formattedTopics.length}-${theme.theme}`}
      />
      
      {/* Hover tooltip */}
      {hoveredWord && (
        <div className="absolute top-4 right-4 bg-black/90 dark:bg-white/90 text-white dark:text-black px-3 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none z-10">
          Click to start quiz on "{hoveredWord}"
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground pointer-events-none">
        <div className="bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border shadow-sm">
          <p className="font-medium mb-1">Word size = popularity</p>
          <p>Hover and click any topic to start</p>
        </div>
      </div>
    </div>
  );
};

export default WordCloud;
