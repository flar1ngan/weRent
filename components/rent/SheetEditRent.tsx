import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  getRentDetails,
  updateItem,
  updateItemImage
} from "@/utils/actions";
import FormImageContainer from "../form/FormImageContainer";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/FormButton";
import { redirect } from "next/navigation";
import FormPriceInput from "../form/FormPriceInput";
import FormCategoriesInput from "../form/FormCategoriesInput";
import FormCitiesInput from "../form/FormCitiesInput";
import FormDescriptionInput from "../form/FormDescriptionInput";
import { LuPenSquare } from "react-icons/lu";

export async function SheetEditRent({ itemId }: { itemId: string }) {
  const item = await getRentDetails(itemId);
  if (!item) redirect("/");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="submit"
          size="icon"
          variant="link"
          className="p-2 cursor-pointer"
        >
          <LuPenSquare />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rediģēt sludinājumu</SheetTitle>
          <SheetDescription>
            Veiciet izmaiņas savā sludinājumā šeit. Kad esat pabeidzis,
            noklikšķiniet uz Saglabāt.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <FormImageContainer
            name={item.name}
            text="Atjaunināt attēlu"
            action={updateItemImage}
            image={item.image}
          >
            <input type="hidden" name="id" value={item.id} />
          </FormImageContainer>
        </div>
        <FormContainer action={updateItem}>
          <input type="hidden" name="id" value={item.id} />
          <div className="grid md:grid-cols-2 gap-2 mb-2 mt-4">
            <div className="col-span-2">
              <FormInput
                name="name"
                type="text"
                label="Nosaukums"
                defaultValue={item.name}
              />
            </div>
            <FormPriceInput defaultValue={item.price} />
            <FormCategoriesInput defaultValue={item.category} />
            <FormCitiesInput defaultValue={item.city} />
          </div>
          <FormDescriptionInput
            name="description"
            labelText="Apraksts"
            defaultValue={item.description}
          />
          <SheetFooter>
            <SheetClose asChild>
              <SubmitButton text="Saglabāt izmaiņas" className="mt-8" />
            </SheetClose>
          </SheetFooter>
        </FormContainer>
      </SheetContent>
    </Sheet>
  );
}
