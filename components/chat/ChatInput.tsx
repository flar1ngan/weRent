"use client"

import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { postMessage } from "@/utils/actions";
import { SubmitButton } from "../form/FormButton";

function ChatInput({receiverId, senderId}:{receiverId:string,senderId:string}) {
  return (
    <Card className="flex p-4 rounded-l-none rounded-tr-none">
     <form action={postMessage}>
      <Input type="text" name="content" placeholder="Ievadiet šeit..." className="flex-1 mr-2" required/>
      <Input type="hidden" name="senderId" value={senderId} />
      <Input type="hidden" name="receiverId" value={receiverId} />
      <SubmitButton/>
     </form>
    </Card>

  );
}

export default ChatInput;
