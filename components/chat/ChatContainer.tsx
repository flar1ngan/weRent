import { getMessages, getUserDetailsByClerkId } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatMessages from "./ChatMessages";

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

  return (
    <div className="flex-1 overflow-y-auto border-t border-r">
      <ChatMessages messages={messages} userId={userId} />
    </div>
  );
}

export default ChatContainer;
