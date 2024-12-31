import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createItem } from "@/utils/actions";
import { SubmitButton } from "@/components/form/FormButton";
import FormPriceInput from "@/components/form/FormPriceInput";
import FormCategoriesInput from "@/components/form/FormCategoriesInput";
import FormDescriptionInput from "@/components/form/FormDescriptionInput";
import FormCitiesInput from "@/components/form/FormCitiesInput";
import FormImage from "@/components/form/FormImage";
import { Card } from "@/components/ui/card";

function CreateItem() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2 mt-4 text-center">
        Sludinājuma informācija
      </h1>
      <h3 className="text-md mb-4 font-light text-center">
        Lūdzu, ievadiet sludinājuma informāciju
      </h3>
      <Card className="p-8">
        <FormContainer action={createItem}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput name="name" type="text" label="Nosaukums" />
            <FormPriceInput />
            <FormCategoriesInput />
            <FormCitiesInput />
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-4 mt-4">
            <div className="col-span-2">
              <FormDescriptionInput
                name="description"
                labelText="Apraksts (līdz 500 vārdiem)"
              />
            </div>
            <FormImage />
          </div>
          <div className="flex justify-center">
            <SubmitButton
              size="lg"
              text="Izveidot sludinājumu"
              className="mt-4"
            />
          </div>
        </FormContainer>
      </Card>
    </section>
  );
}

export default CreateItem;
