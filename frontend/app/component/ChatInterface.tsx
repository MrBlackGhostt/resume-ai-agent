import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/message";
import ChatMessage from "./ChatMessage";
import { Resume } from "@/types/resume";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  resume: Resume;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ resume }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Add initial AI greeting when component mounts
  useEffect(() => {
    const initialMessage: Message = {
      id: crypto.randomUUID(),
      content: `I've analyzed your resume. What would you like to know about it or how can I help you improve it?`,
      role: "ai",
      timestamp: new Date(),
    };

    setMessages([initialMessage]);
  }, [resume]);

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    setIsListening(true);

    // In a real app, we would use the Web Speech API here
    // For now, we'll just simulate receiving voice input after a delay
    setTimeout(() => {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        content:
          "What skills should I highlight on my resume for a software engineering position?",
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: crypto.randomUUID(),
          content:
            "Based on your resume, I recommend highlighting your experience with React, TypeScript, and backend technologies. I also notice you have strong problem-solving skills from your project work that would be valuable to emphasize. Consider adding more quantifiable achievements to make your impact clearer to potential employers.",
          role: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsListening(false);
      }, 2000);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    // In a real app, we would stop the speech recognition here
  };

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="border-t p-6">
          <div className="flex justify-between items-center">
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isListening && "animate-pulse-slow text-brand-500"
              )}>
              {isListening
                ? "Listening..."
                : "Click the microphone to start speaking"}
            </p>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full h-12 w-12",
                isListening && "bg-brand-100 border-brand-300"
              )}
              onClick={toggleListening}>
              {isListening ? (
                <MicOff className="h-6 w-6 text-brand-500" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
