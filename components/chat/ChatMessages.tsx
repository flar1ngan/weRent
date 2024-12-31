"use client";

import { formatDate, formatTime } from "@/utils/format";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date;
};

function ChatMessages({
  messages,
  userId,
  receiverImg,
}: {
  messages: Message[];
  userId: string;
  receiverImg?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [animatedMessages, setAnimatedMessages] = useState<string[]>([]);
  console.log(receiverImg)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    const newMessageIds = messages.map((message) => message.id);
    setAnimatedMessages((prev) => {
      const newMessages = newMessageIds.filter((id) => !prev.includes(id));
      return [...prev, ...newMessages];
    });
  }, [messages]);

  return (
    <div ref={scrollRef} className="h-full">
      {messages.map((message, index) => {
        const messageDate = new Date(message.createdAt);
        const formattedDate = formatDate(messageDate);

        const isNewDay =
          index === 0 ||
          new Date(messages[index - 1].createdAt).toDateString() !==
            messageDate.toDateString();

        const isSender = message.senderId === userId;
        const shouldAnimate = animatedMessages.includes(message.id);

        return (
          <div key={`${message.id}-${index}`}>
            {isNewDay && (
              <div className="text-center text-sm font-light text-muted-foreground my-4">
                {formattedDate}
              </div>
            )}

            <div
              className={`flex mb-4 ${
                isSender ? "justify-end mr-2" : "justify-start ml-2"
              } items-end gap-2`}
            >
              {!isSender && receiverImg && (
                <Image
                  src={receiverImg}
                  alt="Receiver Profile"
                  className="w-10 h-10 rounded-full object-cover"
                  width={30}
                  height={30}
                />
              )}

              <div
                className={`max-w-[75%] text-sm mb-0 font-medium shadow px-3 py-3 ${
                  isSender
                    ? "bg-primary text-primary-foreground rounded-t-xl rounded-bl-xl mr-2"
                    : "bg-secondary text-secondary-foreground rounded-t-xl rounded-br-xl"
                } ${shouldAnimate ? "animate-slide-in-up" : ""}`}
              >
                {message.content}
                <div className="text-xs font-light mt-[6px] text-right">
                  {formatTime(messageDate)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
