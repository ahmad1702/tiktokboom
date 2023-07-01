import { cn } from "@/lib/utils";
import { default as NextLink } from "next/link";

type LinkProps = React.ComponentPropsWithRef<typeof NextLink> & {
  disableAnimation?: boolean;
};

const Link = ({
  className,
  children,
  disableAnimation,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      {...props}
      className={cn(
        "font-medium underline underline-offset-2 duration-300 hover:text-foreground",
        !disableAnimation && "underline-fade-in",
        className
      )}
    >
      {children}
    </NextLink>
  );
};

export default Link;
