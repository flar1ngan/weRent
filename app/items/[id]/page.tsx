import FavoriteButton from "@/components/card/FavoriteButton"
import ItemRating from "@/components/card/ItemRating"
import Breadcrumbs from "@/components/items/Breadcrumbs"
import ImageContainer from "@/components/items/ImageContainer"
import RentCalendar from "@/components/items/RentCalendar"
import UserInfo from "@/components/items/UserInfo"
import { Separator } from "@/components/ui/separator"
import { getItemDetails } from "@/utils/actions"
import Description from "@/components/items/Description"
import { redirect } from "next/navigation"


async function ItemPage({params}:{params:{id:string}}) {
    const item = await getItemDetails(params.id)
    if(!item) redirect("/")
        const firstName = item.profile.firstName;
        const profileImg = item.profile.profileImg;
  return <section>
    <Breadcrumbs name={item.name} />
    <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{item.name}</h1>
        <FavoriteButton itemId={item.id}/>
    </header>
    <ImageContainer image={item.image} name={item.name} />
    <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
            <div className="flex gap-x-4 items-center">
                <h1 className="text-xl font-bold">{item.name}</h1>
                <ItemRating inPage itemId={item.id} />
            </div>
            <UserInfo profile={{firstName,profileImg}} />
            <Separator className="mt-4" />
            <Description description={item.description} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
            <RentCalendar />
        </div>
    </section>
  </section>
}

export default ItemPage