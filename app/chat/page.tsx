import UsersContainer from "@/components/chat/UsersContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getUsersSorted } from "@/utils/actions";
import Link from "next/link";

async function ChatPage() {
  const users = await getUsersSorted();
  return (
    <div className="flex h-[80vh]">
      <Card className="w-1/4 h-full mr-2">
        <UsersContainer receiverUsername="" />
      </Card>
      <Card className="w-3/4 flex flex-col">
        <div className="h-16 border-b p-4 font-semibold flex items-center"></div>
        {users.length === 0 ? (
          <div className="p-2 flex flex-col h-full font-extralight text-center items-center justify-center">
            <p>Jums pašlaik nav neviena aktīva čata</p>
            <Button asChild className="mt-2" size="lg">
              <Link href="/">Atgriezties</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 p-4 overflow-y-auto justify-center font-extralight items-center">
            Izvēlieties tērzēšanas partneri
          </div>
        )}
      </Card>
    </div>
  );
}

export default ChatPage;
