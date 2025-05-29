import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/module/dashboard/components/dashboardNavbar";
import DashboardSidebar from "@/module/dashboard/components/dashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex flex-col h-screen w-screen bg-muted">
          <DashboardNavbar />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
