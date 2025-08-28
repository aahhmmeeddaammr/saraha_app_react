import { AccountDangerZone } from "@/components/Account/AccountDangerZone";
import { ChangePassword } from "@/components/Account/ChangePassword";
import { ProfileImageUpload } from "@/components/Account/ProfileImageUpload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { API_BASEURL, FRONTEND_URL } from "@/lib/config/config";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { User, Mail, Link2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

// Types
interface UserData {
  id: string;
  fullName: string;
  username: string;
  email: string;
  bio?: string;
  picture?: string;
  confirmEmail: boolean;
  messageCount: number;
  profileUrl: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  bio: string;
  image?: File;
}

const Account = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      api
        .get(`${API_BASEURL}/user`)
        .then(({ data }) => {
          console.log(data.data);
          setFormData({ bio: data.data.bio, firstName: data.data.firstName, lastName: data.data.lastName });
          setUser({ ...data.data, profileUrl: `${FRONTEND_URL}/user/${data.data._id}` });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);

  const handleSave = useCallback(async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formDataToSend.append("image", value);
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, String(value));
        }
      });
      await api
        .patch(`${API_BASEURL}/user/update-account`, formDataToSend)
        .then(() => {
          loadUserData();
        })
        .catch((error) => {
          console.log(error);
        });
      // Update user data
      setUser((prev) => (prev ? { ...prev, ...formData } : null));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, user]);

  const handleCancel = useCallback(() => {
    if (user) {
      setFormData({
        firstName: user.fullName.split(" ")[0],
        lastName: user.fullName.split(" ")[1],
        bio: user.bio || "",
      });
    }
    setIsEditing(false);
  }, [user]);

  const handleImageUpload = useCallback((imageUrl: string, file?: File) => {
    setFormData((prev) => {
      return { ...prev, image: file };
    });
    setUser((prev) => (prev ? { ...prev, picture: imageUrl } : null));
  }, []);

  const handleFormChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded w-64"></div>
              <div className="h-4 bg-muted rounded w-96"></div>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="h-96 bg-muted rounded"></div>
              <div className="lg:col-span-2 space-y-8">
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-64 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userInitials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile, privacy, and account preferences</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Profile Overview */}
          <aside className="lg:col-span-1">
            <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/50 shadow-sm sticky top-24">
              <div className="space-y-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-primary/20">
                    <AvatarImage src={user.picture} alt={`${user.fullName}'s avatar`} />
                    <AvatarFallback className="text-lg bg-primary/10">{userInitials}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">{user.fullName}</h2>
                  <p className="text-muted-foreground">@{user.username}</p>

                  <div className="flex justify-center gap-2 mt-3 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      {user.confirmEmail ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Link2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Profile URL:</span>
                  </div>
                  <div className="bg-muted/30 border border-border/50 rounded-lg p-3">
                    <code className="text-xs break-all">{user.profileUrl}</code>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Right Column - Settings Forms */}
          <main className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <Card className="p-6 bg-card/60 backdrop-blur-sm border border-border/50 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Profile Information</h3>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} size="sm">
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm" disabled={isSaving}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Profile Image Upload */}
                <ProfileImageUpload currentImage={user.picture} onImageUpload={handleImageUpload} disabled={!isEditing} />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">First Name </Label>
                    <Input
                      id="name"
                      value={formData.firstName}
                      onChange={(e) => handleFormChange("firstName", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleFormChange("lastName", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell people a bit about yourself..."
                    value={formData.bio}
                    onChange={(e) => handleFormChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground text-right">{formData?.bio?.length ?? 0}/500 characters</p>
                </div>
              </div>
            </Card>

            {/* Change Password */}
            <ChangePassword />

            {/* Account Management */}
            <AccountDangerZone />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
