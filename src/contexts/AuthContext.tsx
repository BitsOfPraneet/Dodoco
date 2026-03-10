import { createContext, useContext, useState, type ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinDate: string;
  savedRegions: string[];
  reportsGenerated: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    setUser({
      name: 'Alex Johnson',
      email,
      avatar: 'AJ',
      role: 'Pro Member',
      joinDate: 'March 2026',
      savedRegions: ['Amazon Basin', 'Borneo'],
      reportsGenerated: 12,
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
