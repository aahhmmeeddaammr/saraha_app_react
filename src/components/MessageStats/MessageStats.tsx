import { Card } from "@/components/ui/card";
import { MessageCircle, Heart, Eye, Calendar } from "lucide-react";

interface MessageStatsProps {
  totalMessages: number;
  unreadMessages: number;
  likedMessages: number;
  thisWeekMessages: number;
}

export const MessageStats = ({ totalMessages, unreadMessages, likedMessages, thisWeekMessages }: MessageStatsProps) => {
  const stats = [
    {
      icon: MessageCircle,
      label: "Total Messages",
      value: totalMessages,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      icon: Eye,
      label: "Unread",
      value: unreadMessages,
      color: "text-accent",
      bgColor: "bg-accent/20",
    },
    {
      icon: Heart,
      label: "Liked",
      value: likedMessages,
      color: "text-red-500",
      bgColor: "bg-red-500/20",
    },
    {
      icon: Calendar,
      label: "This Week",
      value: thisWeekMessages,
      color: "text-primary-glow",
      bgColor: "bg-primary-glow/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="p-6 bg-card/60 backdrop-blur-whispr border border-border/50 hover:shadow-whispr-strong transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center space-x-4">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
