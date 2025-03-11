
import React from "react";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  title: string;
  description: string;
  year: string;
  category: string;
  color: "pink" | "blue" | "green" | "yellow" | "purple" | "peach";
  className?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  year,
  category,
  color = "blue",
  className,
}) => {
  const colorClasses = {
    pink: "bg-pastel-pink/20 border-pastel-pink/30",
    blue: "bg-pastel-blue/20 border-pastel-blue/30",
    green: "bg-pastel-green/20 border-pastel-green/30",
    yellow: "bg-pastel-yellow/20 border-pastel-yellow/30",
    purple: "bg-pastel-purple/20 border-pastel-purple/30",
    peach: "bg-pastel-peach/20 border-pastel-peach/30",
  };

  return (
    <div
      className={cn(
        "relative group p-6 rounded-2xl border transition-all duration-300 hover:shadow-md",
        colorClasses[color],
        className
      )}
    >
      <div className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium bg-white/70 backdrop-blur-sm">
        {year}
      </div>
      
      <span className="inline-block px-3 py-1 mb-4 text-xs rounded-full bg-white/70 backdrop-blur-sm">
        {category}
      </span>
      
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default AchievementCard;
