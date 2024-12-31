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
import { getProfile, updateProfile, updateProfileImage } from "@/utils/actions";
import FormImageContainer from "../form/FormImageContainer";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/FormButton";

export async function SheetEdit() {
  const profile = await getProfile();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Rediģēt profilu</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rediģēt profilu</SheetTitle>
          <SheetDescription>
          Veiciet izmaiņas savā profilā šeit. Kad esat pabeidzis, noklikšķiniet uz Saglabāt izmaiņas.</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <FormImageContainer
            image={profile.profileImg}
            name={profile.username}
            action={updateProfileImage}
            text="Atjaunināt profila attēlu"
          />
        </div>
        <FormContainer action={updateProfile}>
          <div className="grid md:grid-cols-2 gap-4 py-4">
            <FormInput
              type="text"
              name="firstName"
              label="Vārds"
              defaultValue={profile.firstName}
            />
            <FormInput
              type="text"
              name="lastName"
              label="Uzvārds"
              defaultValue={profile.lastName}
            />
            <FormInput
              type="text"
              name="username"
              label="Lietotājvārds"
              defaultValue={profile.username}
            />
          </div>
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
