export type MessageRole = "user" | "ai";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}
