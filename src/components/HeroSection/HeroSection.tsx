import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, MessageSquare, Share } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-whispr-gradient-subtle" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
        <div
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-primary-glow/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 container text-center space-y-8 animate-slide-up">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-br from-primary to-foreground/50  bg-clip-text text-transparent">Anonymous</span>
            <br />
            <span className="text-foreground">Messages</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Receive honest, anonymous feedback from friends, colleagues, and the world. Share your unique link and discover what people really think.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" variant="gradient" className="text-lg px-8 py-3" asChild>
            <Link to="/auth">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="glass" size="lg" className="text-lg px-8 py-6">
            <Share className="h-5 w-5" />
            See How It Works
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          <div className="bg-card/40 backdrop-blur-whispr border border-border/50 rounded-xl p-6 shadow-whispr hover:shadow-whispr-strong transition-all duration-300">
            <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Anonymous</h3>
            <p className="text-muted-foreground">Messages are completely anonymous. Senders choose whether to reveal their identity.</p>
          </div>

          <div className="bg-card/40 backdrop-blur-whispr border border-border/50 rounded-xl p-6 shadow-whispr hover:shadow-whispr-strong transition-all duration-300">
            <div className="bg-accent/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Share className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
            <p className="text-muted-foreground">Get your unique link and share it anywhere. QR codes and one-click sharing included.</p>
          </div>

          <div className="bg-card/40 backdrop-blur-whispr border border-border/50 rounded-xl p-6 shadow-whispr hover:shadow-whispr-strong transition-all duration-300">
            <div className="bg-accent/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
            <p className="text-muted-foreground">Advanced spam protection and moderation tools keep your messages clean and safe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
