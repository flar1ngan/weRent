"use client"

import { Input } from "../ui/input";
import { postMessage } from "@/utils/actions";
import { SubmitButton } from "../form/FormButton";

function ChatInput({ receiverId, senderId }: { receiverId: string; senderId: string }) {
  return (
    <div className="h-16 border-t border-b border-r p-4 flex">
      <form
        action={async (formData) => {
          await postMessage(formData);

          const form = document.querySelector("form");
          form?.reset();
        }}
        className="flex items-center w-full"
      >
        <Input
          type="text"
          name="content"
          placeholder="Ievadiet šeit..."
          className="mr-2 flex-grow"
          required
        />
        <Input type="hidden" name="senderId" value={senderId} />
        <Input type="hidden" name="receiverId" value={receiverId} />
        <SubmitButton />
      </form>
    </div>
  );
}

export default ChatInput;
