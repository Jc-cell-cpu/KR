import { AIEngineSidebar } from "@/components/layout/ai-engine-sidebar";

export default function AIEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <AIEngineSidebar />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
