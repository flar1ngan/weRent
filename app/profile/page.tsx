import { getAllUserItems, getProfile } from "@/utils/actions";
import Image from "next/image";
import ItemsList from "@/components/home/ItemsList";
import { SheetEdit } from "@/components/profile/SheetEdit";
import { Card } from "@/components/ui/card";

async function Profile() {
  const profile = await getProfile();
  const items = await getAllUserItems(profile.username);
  console.log(profile.id);
  return (
    <section>
      <Card className="mt-4 max-w-2xl mx-auto p-6 shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src={profile.profileImg}
            alt="Profila attēls"
            width={128}
            height={128}
            className="object-cover rounded-full border shadow"
          />
          <div>
            <p className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="mb-4 font-light">@{profile.username}</p>

            <SheetEdit />
          </div>
        </div>
      </Card>
      {items.length > 0 ? (
        <>
          <h1 className="text-2xl font-semibold mb-8 mt-12 text-center">
            Lietotāja sludinājumi ({items.length})
          </h1>
          <ItemsList items={items} />
        </>
      ) : null}
    </section>
  );
}

export default Profile;
