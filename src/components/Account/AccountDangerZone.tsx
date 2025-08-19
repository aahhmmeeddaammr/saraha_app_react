import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { API_BASEURL } from "@/lib/config/config";
import { useAuth } from "@/hooks/useAuth";

export const AccountDangerZone = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const { logOut } = useAuth();
  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "delete my account") {
      toast.error("Please type 'delete my account' to confirm");
      return;
    }

    // In a real app, this would trigger account deletion
    api
      .delete(`${API_BASEURL}/user/freeze-account`)
      .then(() => {
        logOut();
      })
      .catch(() => {
        toast.error("Internal server error");
      });
    setDeleteConfirmation("");
  };

  const isDeleteButtonEnabled = deleteConfirmation === "delete my account";

  return (
    <Card className="p-6 bg-card/60 backdrop-blur-whispr border border-destructive/20 shadow-whispr">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h2 className="text-xl font-semibold text-destructive">Delete Account</h2>
        </div>

        <Separator className="bg-destructive/20" />

        {/* Delete Account */}
        <div className="space-y-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <h4 className="font-medium text-destructive mb-2">What will be deleted:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your profile and all personal information</li>
              <li>• All messages sent and received</li>
              <li>• Your custom profile URL</li>
              <li>• Account settings and preferences</li>
              <li>• All uploaded files and images</li>
            </ul>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card/95 backdrop-blur-whispr border border-destructive/50">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Delete Account Permanently
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-4">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive font-medium">⚠️ Warning: This action is irreversible</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delete-confirmation">
                    Type <span className="font-mono bg-muted px-1 rounded">delete my account</span> to confirm:
                  </Label>
                  <Input
                    id="delete-confirmation"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="delete my account"
                    className="font-mono"
                  />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={!isDeleteButtonEnabled}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete Account Forever
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
};
