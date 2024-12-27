"use client";

import { useEffect, useRef } from "react";

interface Message {
  id: string;
  senderId: string;
  content: string;
}

function ChatMessages({ messages, userId }: { messages: Message[]; userId: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.senderId === userId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[75%] text-sm mb-1 shadow rounded-xl px-3 py-2 ${
              message.senderId === userId
                ? "bg-primary text-primary-foreground"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
