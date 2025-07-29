import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnonymousMessageForm } from "@/components/AnonymousMessageForm/AnonymousMessageForm";
import axios, { AxiosError } from "axios";
import { API_BASEURL } from "@/lib/config/config";
import toast from "react-hot-toast";

export const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserI | null>(null);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const getProfile = async () => {
    axios
      .get(`${API_BASEURL}/user/profile/${userId}`)
      .then(({ data }) => {
        setUser(data.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const handleSendMessage = async (message: { content: string; fromName?: string }) => {
    console.log(message);

    const payLoad = {
      ...message,
      recipientId: userId,
    };
    axios
      .post(`${API_BASEURL}/message`, payLoad)
      .then(() => {
        toast.success("message sent successfully");
        setIsMessageSent(true);
        const snedMessageIntrval = setTimeout(() => {
          clearTimeout(snedMessageIntrval);
          setIsMessageSent(false);
        }, 3000);
      })
      .catch(() => {
        toast.error("fail to send message");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">User not found</h1>
          <p className="text-muted-foreground">This Whispr profile doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-2xl mx-auto">
        {isMessageSent ? (
          /* Success Message */
          <Card className="p-8 text-center bg-card/60 backdrop-blur-whispr border border-border/50 shadow-whispr">
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
            <p className="text-muted-foreground mb-6">Your anonymous message has been delivered to {user.fullName}.</p>
            <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Want to send another message? The form will reappear in a few seconds.</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* User Profile Header */}
            <Card className="p-8 text-center bg-card/60 backdrop-blur-whispr border border-border/50 shadow-whispr">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={user.picture} alt={user.firstName} />
                    <AvatarFallback className="text-2xl bg-primary/10">
                      {user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.fullName}</h1>
                  <p className="text-muted-foreground">@{user.userName}</p>
                </div>

                <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    💫 Send anonymous messages to {user.fullName.split(" ")[0]} below. Be kind, honest, and respectful!
                  </p>
                </div>
              </div>
            </Card>

            {/* Message Form */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Send a Message</h2>
                <p className="text-muted-foreground text-sm">Choose to send anonymously or reveal your identity - it's up to you!</p>
              </div>
              <AnonymousMessageForm recipientName={user.fullName} onSendMessage={handleSendMessage} />
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Powered by <span className="bg-whispr-gradient bg-clip-text text-transparent font-medium">Whispr</span> - Create your own anonymous
                message link for free!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
