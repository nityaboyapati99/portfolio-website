
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InterestCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "pink" | "blue" | "green" | "yellow" | "purple" | "peach";
  className?: string;
}

const InterestCard: React.FC<InterestCardProps> = ({
  icon: Icon,
  title,
  description,
  color = "blue",
  className,
}) => {
  const colorClasses = {
    pink: "bg-pastel-pink/10 hover:bg-pastel-pink/20",
    blue: "bg-pastel-blue/10 hover:bg-pastel-blue/20",
    green: "bg-pastel-green/10 hover:bg-pastel-green/20",
    yellow: "bg-pastel-yellow/10 hover:bg-pastel-yellow/20",
    purple: "bg-pastel-purple/10 hover:bg-pastel-purple/20",
    peach: "bg-pastel-peach/10 hover:bg-pastel-peach/20",
  };

  const iconColorClasses = {
    pink: "bg-pastel-pink/30",
    blue: "bg-pastel-blue/30",
    green: "bg-pastel-green/30",
    yellow: "bg-pastel-yellow/30",
    purple: "bg-pastel-purple/30",
    peach: "bg-pastel-peach/30",
  };

  return (
    <div
      className={cn(
        "group p-6 rounded-2xl transition-all duration-300",
        colorClasses[color],
        className
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110",
        iconColorClasses[color]
      )}>
        <Icon className="h-7 w-7" />
      </div>
      
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default InterestCard;
