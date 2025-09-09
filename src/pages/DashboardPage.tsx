import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';

export const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex-1 flex overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5">
          <DashboardOverview />
        </main>
      </div>
    </div>
  );
};