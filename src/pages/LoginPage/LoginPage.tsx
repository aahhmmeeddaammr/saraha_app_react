import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
export const LoginPage = () => {
  const { isLoading, error, signUpError, activeTab, setActiveTab, login, registerFormik, formik, setError, setSignUpError } =
    useAuth();
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-md mx-auto pt-16 pb-8">
        <section className="bg-card/90 backdrop-blur-whispr border border-border/50 rounded-lg shadow-whispr p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-br from-primary to-foreground/50  bg-clip-text text-transparent mb-2">
              Welcome to Whispr
            </h1>
            <p className="text-muted-foreground">Join the anonymous messaging platform</p>
          </div>

          <Tabs value={activeTab} defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger
                onClick={() => {
                  setActiveTab("signin");
                  setError("");
                  setSignUpError("");
                }}
                value="signin"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                  setSignUpError("");
                }}
                value="signup"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/** Sign In Tab */}
            <TabsContent value="signin" className="space-y-4 mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      onChange={formik.handleChange}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      onChange={formik.handleChange}
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      const idToken = credentialResponse.credential;
                      console.log("✅ ID Token:", idToken);
                      login({ provider: "google", idToken: idToken as string });
                    }}
                    onError={() => {
                      console.log("❌ Login Failed");
                    }}
                    theme="outline"
                    shape="pill"
                    type="icon"
                    text="continue_with"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-sm animate-pulse">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.25a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0v-.5zm.75-8a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0010 5.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
                <div className="flex justify-end">
                  <Link to={"/auth/forget-password"} className="hover:underline text-primary">
                    Forget Password
                  </Link>
                </div>
                <Button type="submit" variant="gradient" className="w-full" disabled={isLoading}>
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/** Sign Up Tab */}
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={registerFormik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      onChange={registerFormik.handleChange}
                      name="fullName"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      onChange={registerFormik.handleChange}
                      name="email"
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      onChange={registerFormik.handleChange}
                      name="password"
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      onChange={registerFormik.handleChange}
                      name="phone"
                      id="signup-phone"
                      type="tel"
                      placeholder="Enter your phone"
                      className="pl-10"
                    />
                  </div>
                </div>
                {signUpError && (
                  <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-sm animate-pulse">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.25a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0v-.5zm.75-8a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0010 5.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{signUpError}</span>
                  </div>
                )}
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      const idToken = credentialResponse.credential;
                      console.log("✅ ID Token:", idToken);
                      login({ provider: "google", idToken: idToken as string });
                    }}
                    onError={() => {
                      console.log("❌ Login Failed");
                    }}
                    theme="outline"
                    shape="pill"
                    type="icon"
                    text="continue_with"
                  />
                </div>
                <Button type="submit" variant="gradient" className="w-full" disabled={isLoading}>
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </section>
      </main>
    </div>
  );
};
