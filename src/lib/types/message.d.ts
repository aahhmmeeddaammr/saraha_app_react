interface MessageI {
  _id: string;
  content: string;
  recipientId: string;
  isLike: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  fromName?: string;
  __v: number;
  id: string;
}
