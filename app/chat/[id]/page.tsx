import ChatContainer from "@/components/chat/ChatContainer";
import ChatInput from "@/components/chat/ChatInput";
import UsersContainer from "@/components/chat/UsersContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMessages, getUserDetails } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function ChatPage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const receiverProfile = await getUserDetails(params.id);
  const receiverId = receiverProfile?.clerkId;
  if (!userId || !receiverId) redirect("/");
  return (
    <div className="flex min-w-screen max-h-[80vh]">
        {/* <ScrollArea className="border-b"> */}

      <UsersContainer />
        {/* </ScrollArea> */}
      {/* <div className="flex flex-col flex-grow"> */}
        {/* <ChatContainer receiverUsername={receiverProfile.username} /> */}
        {/* <ChatInput senderId={userId} receiverId={receiverId} /> */}
      {/* </div> */}
    </div>
  );
}

export default ChatPage;
