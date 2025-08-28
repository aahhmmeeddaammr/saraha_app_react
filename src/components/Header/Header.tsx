import { User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import whisprLogo from "@/assets/image.png";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
  };
}

export const Header = ({ user }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId, logOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/60 backdrop-blur-whispr">
      <div className="max-md:w-11/12 w-9/12  flex h-16 items-center justify-between mx-auto">
        <Link to="/" className="flex items-center gap-3 ">
          <img src={whisprLogo} alt="Whispr" className="h-8 w-8 rounded-lg shadow-whispr" />
          <h1 className="text-xl font-bold bg-gradient-to-br from-primary to-foreground/50  bg-clip-text text-transparent">
            Whispr
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {userId ? (
            <>
              <NavLink
                to={`/dashboard`}
                className={
                  "hover:bg-accent hover:text-accent-foreground flex gap-2 items-center px-2 py-1 rounded-md transition-all duration-300"
                }
              >
                <User className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to={`/profile`}
                className={
                  "hover:bg-accent hover:text-accent-foreground flex gap-2 items-center px-2 py-1 rounded-md transition-all duration-300"
                }
              >
                <User className="h-4 w-4" />
                Profile
              </NavLink>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button onClick={logOut} variant="outline" size="sm">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button variant="gradient" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="flex flex-col gap-1">
            <div className="h-0.5 w-4 bg-foreground rounded"></div>
            <div className="h-0.5 w-4 bg-foreground rounded"></div>
            <div className="h-0.5 w-4 bg-foreground rounded"></div>
          </div>
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-card/80 backdrop-blur-whispr">
          <div className="container py-4 space-y-2 mx-auto">
            {userId ? (
              <>
                <NavLink
                  to={`/dashboard`}
                  className={
                    "hover:bg-accent hover:text-accent-foreground flex gap-2 items-center px-2 py-1 rounded-md transition-all duration-300"
                  }
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </NavLink>
                <NavLink
                  to={`/profile`}
                  className={
                    "hover:bg-accent hover:text-accent-foreground flex gap-2 items-center px-2 py-1 rounded-md transition-all duration-300"
                  }
                >
                  <User className="h-4 w-4" />
                  Profile
                </NavLink>
                <Button onClick={logOut} variant="outline" className="w-full justify-start">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="gradient" className="w-full" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
