import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/FormButton";
import FormContainer from "@/components/form/FormContainer";
import { signupAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";

async function SignUpPage() {
  const user = await currentUser();
  if (user?.privateMetadata.profileExist) redirect("/");
  return (
    <section>
      <h1 className="text-2xl font-semibold mt-8 mb-8 text-center">
        Lūdzu, pabeidziet reģistrāciju
      </h1>
      <div className="flex justify-center">
      <Card className="p-8 rounded-md w-[400px]">
        <FormContainer action={signupAction}>
          <div className="grid gap-4 mt-4">
            <FormInput type="text" name="firstName" label="Vārds" />
            <FormInput type="text" name="lastName" label="Uzvārds" />
            <FormInput type="text" name="username" label="Lietotājvārds" />
          </div>
          <div className="flex justify-center">

          <SubmitButton text="Izveidot kontu" className="mt-8" />
          </div>
        </FormContainer>
      </Card>
      </div>
    </section>
  );
}

export default SignUpPage;
