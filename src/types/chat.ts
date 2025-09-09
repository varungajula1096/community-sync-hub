export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  clubId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'document' | 'task_converted';
  attachments?: ChatAttachment[];
  replyTo?: string;
  isEdited: boolean;
  editedAt?: Date;
  reactions: MessageReaction[];
  canConvertToTask: boolean;
  taskConversionRequest?: TaskConversionRequest;
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'document' | 'video';
  url: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

export interface MessageReaction {
  emoji: string;
  users: string[];
  count: number;
}

export interface TaskConversionRequest {
  id: string;
  messageId: string;
  requestedBy: string;
  approvedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  proposedTitle: string;
  proposedDescription: string;
  proposedDueDate: Date;
  proposedAssignees: string[];
  createdAt: Date;
  reviewedAt?: Date;
}

export interface OnlineUser {
  userId: string;
  userName: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: Date;
}