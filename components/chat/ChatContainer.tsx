
import { getMessages, getUserDetailsByClerkId } from "@/utils/actions";
import { Card } from "../ui/card";
import { auth } from "@clerk/nextjs/server";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef } from "react";
import { redirect } from "next/navigation";

async function ChatContainer({
  receiverUsername,
}: {
  receiverUsername: string;
}) {
  const messages = await getMessages(receiverUsername);
  const { userId } = auth();
  if(!userId) redirect("/")
  const user = await getUserDetailsByClerkId(userId)
  if(user?.username===receiverUsername) redirect("/chat")


  return (
    <Card className="flex flex-col flex-1 rounded-l-none rounded-br-none">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with {receiverUsername}</h2>
      </div>
      <ScrollArea className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* <div className="flex-1 p-4 overflow-y-auto space-y-1"> */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] text-sm shadow rounded-xl px-3 py-2 ${
                  message.senderId === userId
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        {/* </div> */}
      </ScrollArea>
    </Card>
    
  );
}

export default ChatContainer;
