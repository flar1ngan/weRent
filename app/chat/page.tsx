import UsersContainer from "@/components/chat/UsersContainer";

async function ChatPage() {
  return (
    <div className="flex h-[80vh]">
      <div className="w-1/4 h-full border">
        <UsersContainer receiverUsername="" />
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="h-16 border-t border-r p-4 font-semibold flex items-center">
          Tērzēšana
        </div>
        <div className="flex-1 p-4 overflow-y-auto border-t border-r border-b"></div>
        {/* <ChatContainer receiverUsername={receiverUsername} />
        <ChatInput senderId={userId} receiverId={receiverId} /> */}
      </div>
    </div>
  );
}

export default ChatPage;
