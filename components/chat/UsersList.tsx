import { UserCardType } from "@/utils/types";
import UserCard from "./UserCard";

function UsersList({ users, receiverUsername }: { users: UserCardType[], receiverUsername:string }) {
  
  return (
    <div className="space-y-1">
      {users.map((user) => {
        return (
          <div key={user.id} className="animate-slide-in-up">
            <UserCard user={user} isActive={user.username === receiverUsername} />
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
