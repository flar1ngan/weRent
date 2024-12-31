import { getMessages, getUserDetails, getUserDetailsByClerkId } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatMessages from "./ChatMessages";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

async function ChatContainer({
  receiverUsername,
}: {
  receiverUsername: string;
}) {
  const messages = await getMessages(receiverUsername);
  const { userId } = auth();
  if (!userId) redirect("/");
  const user = await getUserDetailsByClerkId(userId);
  if (user?.username === receiverUsername) redirect("/chat");
  const receiver = await getUserDetails(receiverUsername)

  return (
    <ScrollArea className="flex-1 h-full">
      <ChatMessages messages={messages} userId={userId} receiverImg={receiver?.profileImg} />
      <ScrollBar/>
    </ScrollArea>
  );
}

export default ChatContainer;
