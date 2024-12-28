import { getAllOtherUsers, getAllOtherUsersSorted } from "@/utils/actions";
import UsersList from "./UsersList";
import { UserCardType } from "@/utils/types";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

async function UsersContainer({receiverUsername}: {receiverUsername: string}) {
  const users = await getAllOtherUsersSorted();
  return (
    <>
      <div className="h-16 p-4 font-semibold border-b flex items-center">Lietotāji</div>
      <ScrollArea className="h-[calc(80vh-4rem)]">
        <div className="p-2">
          <UsersList users={users} receiverUsername={receiverUsername} />
        </div>
      </ScrollArea>
    </>
  );
}

export default UsersContainer;
