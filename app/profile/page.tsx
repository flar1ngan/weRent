import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { updateProfile, getProfile, updateProfileImage } from "@/utils/actions";
import { SubmitButton } from "@/components/form/FormButton";
import FormImageContainer from "@/components/form/FormImageContainer";
async function Profile() {
  const profile = await getProfile();
  return (
    <section>
      <h1 className="capitalize text-2xl font-semibold mb-8">Profils</h1>
      <div className="border p-8 rounded-md max-w-lg">

        <FormImageContainer image={profile.profileImg} name={profile.username} action={updateProfileImage} text="Atjaunināt profila attēlu" />
        <FormContainer action={updateProfile}>
          <div className="grid gap-4 mt-4">
            <FormInput type="text" name="firstName" label="Vārds" defaultValue={profile.firstName}/>
            <FormInput type="text" name="lastName" label="Uzvārds" defaultValue={profile.lastName} />
            <FormInput type="text" name="username" label="Lietotājvārds" defaultValue={profile.username}/>
          </div>
          <SubmitButton text="Atjaunināt profilu" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default Profile;
