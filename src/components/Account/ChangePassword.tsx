import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, Eye, EyeOff, CheckCircle, Key } from "lucide-react";
import { api } from "@/lib/api";
import { API_BASEURL } from "@/lib/config/config";
import toast from "react-hot-toast";

export const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) return;

    setIsLoading(true);
    console.log(passwords);
    api
      .patch(`${API_BASEURL}/user/update-password`, {
        oldPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })
      .then(() => {
        toast.success("password changed successfully");
      })
      .catch((error) => {
        if (error.response.data.errors?.[0]?.path == "oldPassword") {
          toast.error("in-valid format in current password");
        } else if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      });
    setTimeout(() => {
      setIsLoading(false);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 2000);
  };

  const passwordsMatch = passwords.newPassword === passwords.confirmPassword;
  const isValid = passwords.currentPassword.length > 0 && passwords.newPassword.length >= 8 && passwordsMatch;

  const togglePassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Card className="p-6 bg-card/60 backdrop-blur-whispr border border-border/50 shadow-whispr">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Change Password</h2>
        </div>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="currentPassword"
                type={showPasswords.currentPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="pl-10 pr-10"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("currentPassword")}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.currentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="newPassword"
                type={showPasswords.newPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="pl-10 pr-10"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("newPassword")}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.newPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwords.newPassword.length > 0 && passwords.newPassword.length < 8 && (
              <p className="text-sm text-destructive">Password must be at least 8 characters</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmNewPassword"
                type={showPasswords.confirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="pl-10 pr-10"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("confirmPassword")}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.confirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwords.confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-sm text-destructive">Passwords do not match</p>
            )}
            {passwords.confirmPassword.length > 0 && passwordsMatch && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Passwords match</span>
              </div>
            )}
          </div>

          <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">Password Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle
                  className={`h-3 w-3 ${passwords.newPassword.length >= 8 ? "text-green-600" : "text-muted-foreground"}`}
                />
                At least 8 characters long
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle
                  className={`h-3 w-3 ${
                    passwordsMatch && passwords.newPassword.length > 0 ? "text-green-600" : "text-muted-foreground"
                  }`}
                />
                Passwords match
              </li>
            </ul>
          </div>

          <Button type="submit" variant="gradient" disabled={isLoading || !isValid}>
            {isLoading ? "Updating Password..." : "Update Password"}
          </Button>
        </form>
      </div>
    </Card>
  );
};
