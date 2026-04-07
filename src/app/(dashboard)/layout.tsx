import { Sidebar } from "@/components/layout/sidebar";
import { StarBackground } from "@/components/layout/star-background";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main className="relative min-h-screen p-3 pt-[84px] lg:ml-[88px] lg:pt-3">
        <StarBackground />
        <div className="relative z-10 min-w-0">
          {children}
        </div>
      </main>
    </>
  );
}
