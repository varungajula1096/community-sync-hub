export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  clubName: string;
  organizer: {
    id: string;
    name: string;
    role: string;
  };
  startDate: Date;
  endDate: Date;
  location: string;
  isOnline: boolean;
  maxAttendees?: number;
  currentAttendees: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  attendees: EventAttendee[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventAttendee {
  userId: string;
  userName: string;
  status: 'going' | 'maybe' | 'not_going';
  checkedIn: boolean;
  checkInTime?: Date;
  proofOfAttendance?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  assignedBy: string;
  clubId: string;
  eventId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dueDate: Date;
  completionProof?: TaskProof[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskProof {
  id: string;
  type: 'image' | 'document' | 'text';
  url?: string;
  content?: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export type EventFilterType = 'all' | 'upcoming' | 'ongoing' | 'completed' | 'my_events';
export type TaskFilterType = 'all' | 'assigned_to_me' | 'created_by_me' | 'pending' | 'completed';