import { AIEngineSidebar } from "@/components/layout/ai-engine-sidebar";

export default function AIEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100dvh-24px)] flex-col gap-3 xl:h-[calc(100dvh-24px)] xl:flex-row">
      <AIEngineSidebar />
      <div className="min-w-0 flex-1 rounded-[20px] bg-transparent xl:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
