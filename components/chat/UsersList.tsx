import { UserCardType } from "@/utils/types";
import UserCard from "./UserCard";

function UsersList({ users, receiverUsername }: { users: UserCardType[], receiverUsername:string }) {
  return (
    <div className="space-y-2">
      {users.map((user) => {
        return (
          <div>
            <UserCard key={user.id} user={user} isActive={user.username === receiverUsername} />
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;