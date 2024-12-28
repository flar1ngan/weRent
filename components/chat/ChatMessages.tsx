"use client";

import { formatDate, formatTime } from "@/utils/format";
import React, { useEffect, useRef } from "react";

type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date;
};

function ChatMessages({
  messages,
  userId,
}: {
  messages: Message[];
  userId: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto">
      {messages.map((message, index) => {
        console.log(`${message.id}-${index}`);
        const messageDate = new Date(message.createdAt);
        const formattedDate = formatDate(messageDate);

        const isNewDay =
          index === 0 ||
          new Date(messages[index - 1].createdAt).toDateString() !==
            messageDate.toDateString();

         return (
          <div key={`${message.id}-${index}`}>
            {isNewDay && (
              <div className="text-center text-sm text-gray-500 my-4">
                {formattedDate}
              </div>
            )}

            <div
              className={`flex flex-col ${
                message.senderId === userId ? "items-end mr-2" : "items-start ml-2"
              }`}
            >
              <div
                className={`max-w-[75%] text-sm mb-1 shadow rounded-xl px-3 py-2 ${
                  message.senderId === userId
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.content}
              </div>
              <div className="text-xs text-gray-500 mt-[1px] mb-1">
                {formatTime(messageDate)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
