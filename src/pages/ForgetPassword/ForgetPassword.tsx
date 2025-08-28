import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASEURL } from "@/lib/config/config";
import axios from "axios";
import { Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${API_BASEURL}/auth/forget-password`, { email })
      .then(() => {
        console.log("Done");
        toast.success("Email Sended to your gmail");
        navigate(`/auth/otp?email=${email}`);
      })
      .catch((error) => {
        console.log("Fail to forget Password");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className=" bg-background">
      {/* Content */}
      <div className="container max-w-md mx-auto pt-16 pb-8">
        <div className="bg-card/90 backdrop-blur-whispr border border-border/50 rounded-lg shadow-whispr p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-whispr-gradient bg-clip-text text-transparent mb-2">Forgot Password</h1>
            <p className="text-muted-foreground">Enter your email address and we'll send you a code to reset your password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="gradient" className="w-full" disabled={isLoading || !email}>
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/auth" className="text-sm text-primary hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
