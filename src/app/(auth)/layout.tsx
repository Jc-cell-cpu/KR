import { StarBackground } from "@/components/layout/star-background";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-4">
      <StarBackground />
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </main>
  );
}
