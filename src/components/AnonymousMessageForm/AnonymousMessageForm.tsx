import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Send, MessageCircle, User } from "lucide-react";
import { useState } from "react";

interface AnonymousMessageFormProps {
  recipientName: string;
  onSendMessage: (message: { content: string; fromName?: string }) => void;
}

export const AnonymousMessageForm = ({ recipientName, onSendMessage }: AnonymousMessageFormProps) => {
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    if (message.length > 500) {
      return;
    }

    setIsLoading(true);

    try {
      await onSendMessage({
        content: message.trim(),
        fromName: isAnonymous ? undefined : senderName.trim() || undefined,
      });

      setMessage("");
      setSenderName("");
    } catch {
      console.log("dd");
    } finally {
      setIsLoading(false);
    }
  };

  const remainingChars = 500 - message.length;

  return (
    <Card className="p-6 bg-card/60 backdrop-blur-whispr border border-border/50 shadow-whispr">
      <div className="space-y-6">
        <div className="text-center">
          <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Send a message to <span className=" bg-clip-text text-primary">{recipientName}</span>
          </h2>
          <p className="text-muted-foreground">Share your thoughts, feedback, or just say hello - completely anonymously!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center text-sm">
              <span className={`${remainingChars < 50 ? "text-destructive" : "text-muted-foreground"}`}>{remainingChars} characters remaining</span>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-muted/30 border border-border/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <div>
                  <Label htmlFor="anonymous-toggle" className="font-medium">
                    Send anonymously
                  </Label>
                  <p className="text-xs text-muted-foreground">{isAnonymous ? "Your identity will be hidden" : "Your name will be visible"}</p>
                </div>
              </div>
              <Switch id="anonymous-toggle" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
            </div>

            {!isAnonymous && (
              <div className="space-y-2">
                <Label htmlFor="sender-name" className="text-sm">
                  Your name (optional)
                </Label>
                <Input
                  id="sender-name"
                  placeholder="Enter your name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">Your name will be visible to the recipient</p>
              </div>
            )}
          </div>

          <Button type="submit" variant="gradient" className="w-full" disabled={isLoading || !message.trim()}>
            <Send className="h-4 w-4" />
            {isLoading ? "Sending..." : "Send Message"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Messages are subject to our community guidelines. Inappropriate content will be removed.
          </p>
        </form>
      </div>
    </Card>
  );
};
