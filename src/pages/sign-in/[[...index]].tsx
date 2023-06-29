import MainLayout from "@/components/main-layout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <MainLayout className="flex flex-col items-center justify-center">
      <SignIn />
    </MainLayout>
  );
}
