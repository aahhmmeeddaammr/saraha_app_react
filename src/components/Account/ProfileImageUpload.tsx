import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Upload, Camera, Trash2, User } from "lucide-react";
import toast from "react-hot-toast";

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageUpload: (imageUrl: string, file?: File) => void;
  disabled?: boolean;
  userName?: string;
}

export const ProfileImageUpload = ({
  currentImage,
  onImageUpload,
  disabled = false,
  userName = "User",
}: ProfileImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage as string);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);

    // Simulate upload process
    setIsUploading(true);
    setTimeout(() => {
      const mockImageUrl = URL.createObjectURL(file);
      onImageUpload(mockImageUrl, file);
      setIsUploading(false);
      toast.success("Profile image uploaded successfully!");
    }, 1500);
  };

  const handleRemoveImage = () => {
    onImageUpload("");
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Profile image removed");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const displayImage = preview || "";

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Profile Picture</Label>

      <div className="flex items-center gap-6">
        {/* Avatar Display */}
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-border/50">
            <AvatarImage src={displayImage} alt={userName} />
            <AvatarFallback className="text-lg bg-primary/10">
              {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
              ) : (
                <User className="h-8 w-8" />
              )}
            </AvatarFallback>
          </Avatar>

          {/* Upload Overlay */}
          {!disabled && (
            <Button
              size="sm"
              variant="secondary"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 shadow-whispr"
              onClick={triggerFileInput}
              disabled={isUploading}
            >
              <Camera className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Upload Controls */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              disabled={disabled || isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Photo"}
            </Button>

            {(currentImage || preview) && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveImage}
                  disabled={disabled || isUploading}
                  className="flex items-center gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            )}
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>JPG, PNG or GIF (max. 5MB)</p>
            <p>Square images work best</p>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {/* Upload Progress */}
      {isUploading && (
        <div className="bg-muted/30 border border-border/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
            <span>Uploading your profile picture...</span>
          </div>
          <div className="mt-2 bg-border/50 rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-full transition-all duration-1000 ease-out" style={{ width: "70%" }} />
          </div>
        </div>
      )}
    </div>
  );
};
