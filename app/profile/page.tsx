import { getAllUserItems, getProfile } from "@/utils/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ItemsList from "@/components/home/ItemsList";

async function Profile() {
  const profile = await getProfile();
  const items = await getAllUserItems(profile.id)
  return (
    <section>
      <div className="flex gap-x-6">
        <Image
          src={profile.profileImg}
          alt="Profila attēls"
          width={256}
          height={256}
          className="object-cover rounded mb-2"
        />
        <div>
          <p className="text-3xl font-semibold">{profile.firstName + " " + profile.lastName}</p>
          <p className="mb-8">@{profile.username}</p>
          <Link href="/profile/update">
            <Button variant="default" size="lg">
              Rediģēt profilu
            </Button>
          </Link>
        </div>
      </div>
      <h1 className="capitalize text-2xl font-semibold mb-8 mt-16">Lietotāja sludinājumi:</h1>
      <ItemsList items={items}/>
    </section>
  );
}

export default Profile;
