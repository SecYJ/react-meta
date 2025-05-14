import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className="justify-start p-2"
      onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <>
          <Sun className="h-6 w-6" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-6 w-6" />
          <span>Dark Mode</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
