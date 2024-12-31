import { getUsersSorted } from "@/utils/actions";
import UsersList from "./UsersList";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

async function UsersContainer({
  receiverUsername,
}: {
  receiverUsername: string;
}) {
  const users = await getUsersSorted();
  return (
    <div className="flex flex-col h-full">
      <div className="h-16 p-4 font-semibold border-b flex items-center text-center text-lg justify-center">
        Čatu saraksts
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <UsersList users={users} receiverUsername={receiverUsername} />
        </div>
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}

export default UsersContainer;
