import { getAllUserItems, getUserDetails } from "@/utils/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ItemsList from "@/components/home/ItemsList";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

async function ProfilePage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const profile = await getUserDetails(params.id);
  if (!profile) redirect("/");
  const items = await getAllUserItems(params.id);
  return (
    <section>
      <div className="flex gap-x-6">
        <Image
          src={profile.profileImg}
          alt="Profila attēls"
          width={256}
          height={256}
          className="object-cover rounded mb-2 border"
        />
        <div>
          <p className="text-3xl font-semibold">
            {profile.firstName + " " + profile.lastName}
          </p>
          <p className="mb-8">@{profile.username}</p>
          {userId === profile.clerkId && (
            <Link href="/profile/update">
              <Button variant="default" size="lg">
                Rediģēt profilu
              </Button>
            </Link>
          )}
        </div>
      </div>
      <h1 className="capitalize text-2xl font-semibold mb-8 mt-16">
        Lietotāja sludinājumi:
      </h1>
      <ItemsList items={items} />
    </section>
  );
}

export default ProfilePage;
