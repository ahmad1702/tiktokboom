import { cn } from "@/lib/utils";
import Navbar from "./navbar";

const MainLayout = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-screen overflow-hidden flex flex-col overscroll-none",
        containerClassName
      )}
    >
      <Navbar />
      <main className={cn("flex-1 overflow-y-auto", className)}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
