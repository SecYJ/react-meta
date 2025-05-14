import { getItem, setItem } from "@/lib/utils/localStorage";
import { createContext, ReactNode, use, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface Props {
  children: ReactNode;
  storageKey?: string;
  defaultTheme?: Theme;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  toggleTheme: () => {},
});

const ThemeProvider = ({
  children,
  storageKey = "advanced-react-theme",
  defaultTheme = "dark",
}: Props) => {
  const [theme, setTheme] = useState(
    getItem<Theme>(storageKey) ?? defaultTheme,
  );

  const toggleTheme = (theme: Theme) => {
    setTheme(theme);
    setItem(storageKey, theme);
  };

  // Apply theme to the document based on the selected theme or system preference
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

export function useTheme() {
  const context = use(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export default ThemeProvider;
