import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, QrCode, Share2, Twitter, Facebook, MessageCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ShareableLinkProps {
  profileUrl: string;
}

export const ShareableLink = ({ profileUrl }: ShareableLinkProps) => {
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const shareToSocial = (platform: "twitter" | "facebook" | "whatsapp") => {
    const text = `Send me anonymous messages on Whispr: ${profileUrl}`;
    let url = "";

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
    }

    window.open(url, "_blank", "width=600,height=400");
  };

  const generateQRCode = () => {
    // In a real app, you'd use a QR code library like qrcode
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileUrl)}`;
  };

  return (
    <Card className="p-6 bg-card/60 backdrop-blur-whispr border border-border/50 shadow-whispr">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Whispr Link</h3>
          <p className="text-muted-foreground text-sm">Share this link to receive anonymous messages</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-link">Profile URL</Label>
          <div className="flex gap-2">
            <Input id="profile-link" value={profileUrl} readOnly className="font-mono text-sm" />
            <Button variant="glass" size="sm" onClick={copyToClipboard} className="shrink-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Quick Share</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant="glass" size="sm" onClick={() => shareToSocial("twitter")} className="text-blue-400">
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            <Button variant="glass" size="sm" onClick={() => shareToSocial("facebook")} className="text-blue-600">
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            <Button variant="glass" size="sm" onClick={() => shareToSocial("whatsapp")} className="text-green-500">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button variant="glass" size="sm" onClick={() => setShowQR(!showQR)}>
              <QrCode className="h-4 w-4" />
              QR Code
            </Button>
          </div>
        </div>

        {showQR && (
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <img src={generateQRCode()} alt="QR Code for your Whispr profile" className="w-48 h-48" />
            </div>
          </div>
        )}

        <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Pro Tip
          </h4>
          <p className="text-sm text-muted-foreground">
            Add your Whispr link to your social media bio, email signature, or business card to get more anonymous feedback!
          </p>
        </div>
      </div>
    </Card>
  );
};
