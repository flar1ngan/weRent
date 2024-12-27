import { UserCardType } from "@/utils/types"
import UserCard from "./UserCard";

function UsersList({users}:{users:UserCardType[]}) {
  return (
    <div className="space-y-2">
    {users.map((user)=>{
      return (
        <div>

      <UserCard key={user.id} user={user} />
      <UserCard key={user.id} user={user} />
      <UserCard key={user.id} user={user} />
      <UserCard key={user.id} user={user} />
      <UserCard key={user.id} user={user} />
      <UserCard key={user.id} user={user} />
      <UserCard key={user.id} user={user} />
      <UserCard key={user.id} user={user} />
        </div>

      );
    })}
    
  </div>
  )
}

export default UsersList