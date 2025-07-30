import { createContext, useState, type PropsWithChildren } from "react";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
}

interface AuthContextI extends AuthState {
  setAuth: (data?: AuthState) => void;
}

export const AuthContext = createContext<AuthContextI>({
  accessToken: null,
  refreshToken: null,
  userId: null,
  setAuth: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const setAuth = (data?: AuthState) => {
    setAccessToken(data?.accessToken || null);
    setRefreshToken(data?.refreshToken || null);
    setUserId(data?.userId || null);
  };
  return <AuthContext.Provider value={{ accessToken, refreshToken, userId, setAuth }}>{children}</AuthContext.Provider>;
}
