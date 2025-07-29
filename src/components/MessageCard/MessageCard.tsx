import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Clock, Heart } from "lucide-react";
import { useState } from "react";

interface MessageCardProps {
  message: MessageI;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
}

export const MessageCard = ({ message, onDelete, onLike }: MessageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <Card
      className={`p-6 transition-all duration-300 hover:shadow-whispr-strong border-border/50 bg-card/60 backdrop-blur-whispr ${
        !message.isRead ? "border-l-4 border-l-primary shadow-whispr" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${message.isRead ? "bg-muted" : "bg-primary animate-pulse-glow"}`} />
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(new Date(message.createdAt))}
            </span>
            {message.fromName && <span className="text-sm font-medium text-accent">from {message.fromName}</span>}
          </div>

          <div className={`flex items-center gap-1 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <Button variant="ghost" size="sm" onClick={() => onDelete(message.id)} className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onLike(message.id)} className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
              <Heart className={`h-4 w-4 ${message.isLike ? "fill-destructive stroke-destructive" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Message Content */}
        <div className={`text-foreground leading-relaxed ${!message.isRead ? "font-medium" : ""}`}>{message.content}</div>

        {/* Message Tags */}
        <div className="flex items-center gap-2 text-xs">
          {!message.isRead && <span className="bg-primary/20 text-primary px-2 py-1 rounded-full">New</span>}
          {message.isLike && <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded-full">Liked</span>}
          {!message.fromName && <span className="bg-muted/50 text-muted-foreground px-2 py-1 rounded-full">Anonymous</span>}
        </div>
      </div>
    </Card>
  );
};
