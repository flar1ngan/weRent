import ChatContainer from "@/components/chat/ChatContainer";
import ChatInput from "@/components/chat/ChatInput";
import UsersContainer from "@/components/chat/UsersContainer";
import { Card } from "@/components/ui/card";
import { getUserDetails } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function ChatPage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const receiverProfile = await getUserDetails(params.id);
  const receiverId = receiverProfile?.clerkId;
  if (!userId || !receiverId) redirect("/chat");
  return (
    <div className="flex h-[80vh]">
      <Card className="w-1/4 h-full mr-2">
        <Suspense
          fallback={
            <>
              <div className="h-16 p-4 font-semibold border-b flex items-center text-center text-lg justify-center">
                Čatu saraksts
              </div>
              <div className="h-[calc(80vh-4rem)] flex justify-center items-center ">
                <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
              </div>
            </>
          }
        >
          <UsersContainer receiverUsername={receiverProfile.username} />
        </Suspense>
      </Card>
      <Card className="w-3/4 flex flex-col">
        <Link href={`/profile/${receiverProfile.username}`}>
          <div className="h-16 text-lg p-4 border-b font-semibold flex items-center gap-3">
            <Image
              src={receiverProfile.profileImg}
              alt={receiverProfile.username}
              width={36}
              height={36}
              className="w-11 h-11 rounded-full object-cover"
            />
            {receiverProfile.firstName + " " + receiverProfile.lastName}
          </div>
        </Link>
        <Suspense
          fallback={
            <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center">
              <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
            </div>
          }
        >
          <ChatContainer receiverUsername={receiverProfile.username} />
        </Suspense>
        <ChatInput senderId={userId} receiverId={receiverId} />
      </Card>
    </div>
  );
}

export default ChatPage;
