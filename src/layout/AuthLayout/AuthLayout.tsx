import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import whisprLogo from "@/assets/image.png";

const AuthLayout = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/60 backdrop-blur-whispr">
        <div className="max-md:w-11/12 w-9/12 flex h-16 items-center justify-between mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <ArrowLeft className="h-5 w-5" />
            <img src={whisprLogo} alt="Whispr" className="h-8 w-8 rounded-lg shadow-whispr" />
            <h1 className="text-xl font-bold bg-gradient-to-br from-primary to-foreground/50  bg-clip-text text-transparent">
              Whispr
            </h1>
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
