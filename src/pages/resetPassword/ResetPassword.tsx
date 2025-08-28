import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASEURL } from "@/lib/config/config";
import axios from "axios";
import { Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [params] = useSearchParams();
  const email = params.get("email");
  const Navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .patch(`${API_BASEURL}/auth/reset-password`, { email, rePassword, password })
      .then(() => {
        console.log("Done");
        toast.success("Doneee");
        Navigate("/auth");
      })
      .catch((error) => {
        toast.error("Fail to forget Password");
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
            <h1 className="text-3xl font-bold bg-whispr-gradient bg-clip-text text-transparent mb-2">Verify your OTP</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="repassword">Confirm password:</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="repassword"
                  type="password"
                  placeholder="Enter your rePassword"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">OTP</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your OTP"
                  className="pl-10"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="gradient" className="w-full" disabled={isLoading || !password || !rePassword}>
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

export default ResetPassword;
