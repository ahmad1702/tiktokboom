"use client";

import { PopoverClose } from "@radix-ui/react-popover";
import { XIcon } from "lucide-react";
import { default as NextLink } from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/site-config";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import Link from "./link";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

export interface NestedNavItem extends NavItem {
  items: NestedNavItem[];
}
export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export function MobileDropdown(props: {
  items: { main: NavItem[]; docs: NestedNavItem[] };
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="">
          {isOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <Icons.menu className={cn("h-6 w-6", isOpen && "open")} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 mt-2 h-[calc(100vh-4rem)] w-screen animate-none rounded-none border-none bg-background transition-transform">
        <ScrollArea className="pb-8">
          {props.items.docs.map((item, index) => (
            <div key={index} className="flex flex-col space-y-3 pt-6">
              <h4 className="font-bold">{item.title}</h4>
              {item?.items?.length &&
                item.items.map((item) => (
                  <PopoverClose asChild key={item.href}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex py-1 text-base font-medium text-muted-foreground underline-offset-4 transition-colors before:bottom-1 hover:text-primary",
                          item.href === pathname && "text-foreground"
                        )}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noreferrer" : ""}
                      >
                        {item.title}
                        {item.label && (
                          <span className="ml-2 rounded-md bg-teal-100 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:bg-teal-600">
                            {item.label}
                          </span>
                        )}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </PopoverClose>
                ))}
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center gap-1 border-t pt-4">
          <NextLink
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Icons.linkedIn className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </NextLink>
          <NextLink
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "ghost",
              })
            )}
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </NextLink>
          <ThemeToggle />
        </div>
      </PopoverContent>
    </Popover>
  );
}
