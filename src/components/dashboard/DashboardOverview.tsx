import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  CheckSquare, 
  Users, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Camera,
  Upload
} from 'lucide-react';

export const DashboardOverview = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Mock data - would come from API
  const stats = {
    upcomingEvents: 3,
    pendingTasks: 5,
    completedTasks: 12,
    activeMembers: 24,
    unreadMessages: 8,
  };

  const upcomingEvents = [
    {
      id: '1',
      title: 'Tech Innovation Summit',
      date: '2024-01-15',
      time: '2:00 PM',
      location: 'Main Auditorium',
      attendees: 45,
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Weekly Team Meeting',
      date: '2024-01-12',
      time: '10:00 AM',
      location: 'Conference Room A',
      attendees: 12,
      status: 'confirmed'
    },
    {
      id: '3',
      title: 'Workshop: AI & Machine Learning',
      date: '2024-01-18',
      time: '3:30 PM',
      location: 'Lab 205',
      attendees: 28,
      status: 'draft'
    }
  ];

  const recentTasks = [
    {
      id: '1',
      title: 'Setup event registration system',
      priority: 'high',
      dueDate: '2024-01-14',
      status: 'in_progress',
      assignedTo: 'Tech Team'
    },
    {
      id: '2',
      title: 'Prepare presentation slides',
      priority: 'medium',
      dueDate: '2024-01-16',
      status: 'pending',
      assignedTo: 'Marketing Team'
    },
    {
      id: '3',
      title: 'Book catering for summit',
      priority: 'high',
      dueDate: '2024-01-13',
      status: 'completed',
      assignedTo: 'Event Coordinator'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-warning" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name}!
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening in your {user.clubName || 'community'} today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingTasks} pending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMembers}</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              In club chat
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Events scheduled for the next week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{event.date} at {event.time}</span>
                    <span>📍 {event.location}</span>
                    <span>👥 {event.attendees} attending</span>
                  </div>
                </div>
                <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                  {event.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Events
            </Button>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              Recent Tasks
            </CardTitle>
            <CardDescription>
              Your assigned tasks and progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <h4 className="font-medium">{task.title}</h4>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Due: {task.dueDate}</span>
                    <span>👤 {task.assignedTo}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                  {task.status === 'completed' && (
                    <Button size="sm" variant="outline">
                      <Camera className="h-3 w-3 mr-1" />
                      View Proof
                    </Button>
                  )}
                  {task.status === 'in_progress' && (
                    <Button size="sm" variant="outline">
                      <Upload className="h-3 w-3 mr-1" />
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Weekly Progress
          </CardTitle>
          <CardDescription>
            Your activity and engagement this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Events Attended</span>
                <span>3/4</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tasks Completed</span>
                <span>8/10</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Messages Sent</span>
                <span>24/30</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};