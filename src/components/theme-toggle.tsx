import { useTheme } from "next-themes";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function ThemeToggle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      {...props}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={className}
    >
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
