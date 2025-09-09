import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  CheckSquare,
  Users,
  Search,
  Image,
  File
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'task_converted';
  canConvertToTask?: boolean;
}

export const ChatInterface = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  // Mock messages
  const messages: Message[] = [
    {
      id: '1',
      content: 'Hey everyone! Don\'t forget about tomorrow\'s Tech Summit preparation meeting.',
      sender: {
        id: '2',
        name: 'Tech Club Leader',
        role: 'primary_admin',
        avatar: undefined
      },
      timestamp: new Date('2024-01-11T10:30:00'),
      type: 'text',
      canConvertToTask: true
    },
    {
      id: '2',
      content: 'I can help with the presentation setup. What time should we arrive?',
      sender: {
        id: '3',
        name: 'Event Manager',
        role: 'manager',
        avatar: undefined
      },
      timestamp: new Date('2024-01-11T10:32:00'),
      type: 'text',
      canConvertToTask: true
    },
    {
      id: '3',
      content: 'Great! Let\'s aim for 1:00 PM to set up everything properly.',
      sender: {
        id: '2',
        name: 'Tech Club Leader',
        role: 'primary_admin',
        avatar: undefined
      },
      timestamp: new Date('2024-01-11T10:35:00'),
      type: 'text',
      canConvertToTask: false
    },
    {
      id: '4',
      content: 'Should we create a task list for the setup? I can coordinate the audio/visual equipment.',
      sender: {
        id: '4',
        name: 'Club Member',
        role: 'member',
        avatar: undefined
      },
      timestamp: new Date('2024-01-11T10:40:00'),
      type: 'text',
      canConvertToTask: true
    }
  ];

  const onlineUsers = [
    { id: '2', name: 'Tech Club Leader', status: 'online' },
    { id: '3', name: 'Event Manager', status: 'online' },
    { id: '5', name: 'Sarah Wilson', status: 'away' },
    { id: '6', name: 'Mike Johnson', status: 'online' }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Would send message via Socket.IO
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleConvertToTask = (messageId: string) => {
    console.log('Converting message to task:', messageId);
    // Would open task creation modal
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'main_admin': return 'from-yellow-500 to-amber-500';
      case 'primary_admin': return 'from-purple-500 to-indigo-500';
      case 'manager': return 'from-blue-500 to-cyan-500';
      case 'member': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Messages Area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-4 bg-card/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Tech Innovation Club</h2>
                <p className="text-sm text-muted-foreground">
                  {onlineUsers.filter(u => u.status === 'online').length} members online
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start space-x-3 group hover:bg-accent/20 p-2 rounded-lg transition-colors ${
                  selectedMessage === msg.id ? 'bg-accent/30' : ''
                }`}
                onClick={() => setSelectedMessage(selectedMessage === msg.id ? null : msg.id)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                  <AvatarFallback className={`bg-gradient-to-br ${getRoleColor(msg.sender.role)} text-white`}>
                    {msg.sender.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{msg.sender.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {msg.sender.role.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  {msg.canConvertToTask && (user?.role === 'primary_admin' || user?.role === 'manager') && (
                    <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConvertToTask(msg.id);
                        }}
                        className="text-xs h-6"
                      >
                        <CheckSquare className="h-3 w-3 mr-1" />
                        Convert to Task
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4 bg-card/50">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <File className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Online Users Sidebar */}
        <Card className="w-64 rounded-none border-l border-r-0 border-t-0 border-b-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Online ({onlineUsers.filter(u => u.status === 'online').length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-2 rounded hover:bg-accent/50 transition-colors">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                    user.status === 'online' ? 'bg-green-500' : 
                    user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};