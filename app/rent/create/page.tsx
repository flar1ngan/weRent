import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createItem } from "@/utils/actions";
import { SubmitButton } from "@/components/form/FormButton";
import FormPriceInput from "@/components/form/FormPriceInput";
import FormCategoriesInput from "@/components/form/FormCategoriesInput";
import FormDescriptionInput from "@/components/form/FormDescriptionInput";
import FormCitiesInput from "@/components/form/FormCitiesInput";
import FormImage from "@/components/form/FormImage";

function CreateItem() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8">
        Izveidot slūdinājumu
      </h1>
      <div className="border p-8 rounded">
        <h3 className="text-lg mb-4 font-medium">Informācija</h3>
        <FormContainer action={createItem}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Nosaukums"
            />
            <FormPriceInput />
            <FormCategoriesInput />
            <FormCitiesInput />
          </div>
          <FormDescriptionInput name="description" labelText="Apraksts (līdz 500 vārdiem)"/>
          <div className="grid md:grid-cols-2 gap-8 mb-4 mt-4">
            <FormImage />
          </div>
          <SubmitButton
            text="Izveidot slūdinājumu"
            className="capitalize mt-10"
          />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateItem;
