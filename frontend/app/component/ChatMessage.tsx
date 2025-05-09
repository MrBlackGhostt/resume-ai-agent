import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/message";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.role === "ai";

  return (
    <div
      className={cn("flex items-start gap-3 py-4", isAi ? "bg-muted/30" : "")}>
      <Avatar className="mt-0.5">
        {isAi ? (
          <>
            <AvatarImage src="/placeholder.svg" alt="AI" />
            <AvatarFallback className="bg-brand-500 text-white">
              AI
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/placeholder.svg" alt="You" />
            <AvatarFallback>You</AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="flex-1 space-y-2">
        <p className="font-medium">{isAi ? "AI Assistant" : "You"}</p>
        <div className="prose prose-sm">{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
