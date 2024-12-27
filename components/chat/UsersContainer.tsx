import { getAllOtherUsers } from "@/utils/actions";
import UsersList from "./UsersList";
import { UserCardType } from "@/utils/types";
import { Card } from "../ui/card";

async function UsersContainer() {
  const users: UserCardType[] = await getAllOtherUsers();
  return (
    <div className="border-b border-2">
      {/* <div className="w-1/4 bg-white shadow-md flex flex-col"> */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <UsersList users={users} />
      </div>
      {/* </div> */}
    </div>
  );
}

export default UsersContainer;
