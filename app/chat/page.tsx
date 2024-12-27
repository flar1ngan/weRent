import ChatContainer from "@/components/chat/ChatContainer";
import UsersContainer from "@/components/chat/UsersContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

async function ChatPage() {
  return (
    <div className="flex h-[80vh]">
      <UsersContainer />
      <div className="flex flex-col flex-1">
        <ChatContainer />
        <Card className="flex p-4 rounded-l-none rounded-tr-none">
          <Input placeholder="Ievadiet šeit..." className="flex-1 mr-2" />
          <Button variant="default">
            Submit
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default ChatPage;
