// import { Header } from "@/components/layout/Header";
import { MessageCard } from "@/components/MessageCard/MessageCard";
import { MessageStats } from "@/components/MessageStats/MessageStats";
import { ShareableLink } from "@/components/ShareableLink/ShareableLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { API_BASEURL, FRONTEND_URL } from "@/lib/config/config";
import axios, { AxiosError } from "axios";
import { Search, Filter, SortAsc } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const [messages, setMessages] = useState<MessageI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { userId, accessToken } = useAuth();
  const profileUrl = `${FRONTEND_URL}/user/${userId}`;

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = message.content.toLowerCase().includes(searchTerm.toLowerCase());

    switch (activeTab) {
      case "unread":
        return !message.isRead && matchesSearch;
      case "liked":
        return message.isLike && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const stats = {
    totalMessages: messages.length,
    unreadMessages: messages.filter((m) => !m.isRead).length,
    likedMessages: messages.filter((m) => m.isLike).length,
    thisWeekMessages: messages.filter((m) => new Date(m.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000).length,
  };
  console.log(accessToken);

  const getUserMessages = async () => {
    axios
      .get(`${API_BASEURL}/message/my-messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data }) => {
        setMessages(data.data.messages.reverse());
        console.log(data.data.messages);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserMessages();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <div className="max-md:w-11/12 w-9/12 mx-auto py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold ">
            Welcome back, <span className="text-primary">Ahmed Amr</span>
          </h1>
          <p className="text-muted-foreground">Manage your anonymous messages and share your Whispr link</p>
        </div>

        {/* Stats */}
        <MessageStats {...stats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Messages</h2>
              <div className="flex gap-2">
                <Button variant="glass" size="sm">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="glass" size="sm">
                  <SortAsc className="h-4 w-4" />
                  Sort
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>

            {/* Message Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all">All ({messages.length})</TabsTrigger>
                <TabsTrigger value="unread">Unread ({stats.unreadMessages})</TabsTrigger>
                <TabsTrigger value="liked">Liked ({stats.likedMessages})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4 mt-6">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <MessageCard
                      onLike={async () => {
                        await axios
                          .patch(
                            `${API_BASEURL}/message`,
                            { messageId: message._id },
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                            }
                          )
                          .then(({ data }) => {
                            getUserMessages();
                            console.log(data);
                            toast.success("done");
                          })
                          .catch((error) => {
                            console.log(error);
                            toast.error("fail");
                          });
                      }}
                      onDelete={async () => {
                        await axios
                          .delete(`${API_BASEURL}/message/${message._id}`, {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                            },
                          })
                          .then(({ data }) => {
                            getUserMessages();
                            toast.success("message deleted successfully");
                            console.log(data);
                          })
                          .catch((error) => {
                            console.log(error);
                            toast.error("fail to delete message");
                          });
                      }}
                      key={message.id}
                      message={message}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">No messages found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? "Try adjusting your search terms" : "Share your link to start receiving messages!"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ShareableLink profileUrl={profileUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
