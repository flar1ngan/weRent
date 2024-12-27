import { getAllOtherUsers } from "@/utils/actions";
import UsersList from "./UsersList";
import { UserCardType } from "@/utils/types";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

async function UsersContainer() {
  const users: UserCardType[] = await getAllOtherUsers();
  return (
    <>
      <div className="h-16 p-4 font-semibold border-b flex items-center">Users</div>
      <ScrollArea className="h-[calc(80vh-4rem)]">
        <div className="p-2">
          <UsersList users={users} />
        </div>
      </ScrollArea>
    </>
  );
}

export default UsersContainer;
