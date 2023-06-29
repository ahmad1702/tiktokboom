import MainLayout from "@/components/main-layout";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <MainLayout className="flex flex-col items-center justify-center">
      <SignUp />
    </MainLayout>
  );
}
