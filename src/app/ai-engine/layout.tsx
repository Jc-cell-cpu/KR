import { AIEngineSidebar } from "@/components/layout/ai-engine-sidebar";

export default function AIEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-24px)] gap-3 bg-red-400/0">
      <AIEngineSidebar />
      <div className="flex-1 overflow-y-auto rounded-[20px] bg-transparent">
        {children}
      </div>
    </div>
  );
}
