import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MessageSquare, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Settings,
  Home,
  Plus,
  Shield,
  Crown
} from 'lucide-react';

interface NavigationItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  count?: number;
  roles: string[];
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    roles: ['main_admin', 'primary_admin', 'manager', 'member'],
  },
  {
    name: 'Events',
    icon: Calendar,
    href: '/events',
    count: 5,
    roles: ['main_admin', 'primary_admin', 'manager', 'member'],
  },
  {
    name: 'Tasks',
    icon: CheckSquare,
    href: '/tasks',
    count: 8,
    roles: ['main_admin', 'primary_admin', 'manager', 'member'],
  },
  {
    name: 'Chat',
    icon: MessageSquare,
    href: '/chat',
    count: 12,
    roles: ['main_admin', 'primary_admin', 'manager', 'member'],
  },
  {
    name: 'Members',
    icon: Users,
    href: '/members',
    roles: ['main_admin', 'primary_admin', 'manager'],
  },
  {
    name: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
    roles: ['main_admin', 'primary_admin'],
  },
  {
    name: 'Club Management',
    icon: Shield,
    href: '/club-management',
    roles: ['main_admin'],
  },
  {
    name: 'System Admin',
    icon: Crown,
    href: '/admin',
    roles: ['main_admin'],
  },
];

export const DashboardSidebar = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const userNavigation = navigation.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 border-r border-border bg-card/30 backdrop-blur">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>
        
        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            {userNavigation.map((item) => (
              <li key={item.name}>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start h-10 px-3",
                    "hover:bg-accent/50 hover:text-accent-foreground",
                    item.name === 'Dashboard' && "bg-accent/30 text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.count && (
                    <Badge variant="secondary" className="ml-auto h-5 px-2 text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </aside>
  );
};