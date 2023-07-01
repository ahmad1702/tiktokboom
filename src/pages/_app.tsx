import { ProfileProvider } from "@/hooks/useProfile";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Create a client
export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        {...pageProps}
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <ProfileProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className={inter.className}>
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </ProfileProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
