import { getRentDetails, updateItem, updateItemImage } from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import FormCategoriesInput from "@/components/form/FormCategoriesInput";
import FormPriceInput from "@/components/form/FormPriceInput";
import FormDescriptionInput from "@/components/form/FormDescriptionInput";
import FormCitiesInput from "@/components/form/FormCitiesInput";
import { SubmitButton } from "@/components/form/FormButton";
import { redirect } from "next/navigation";
import FormImageContainer from "@/components/form/FormImageContainer";

async function EditRentPage({ params }: { params: { id: string } }) {
  const item = await getRentDetails(params.id);
  if (!item) redirect("/");

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8">Rediģēt sludinājumu</h1>
      <div className="border rounded p-8">
        <FormImageContainer
          name={item.name}
          text="Atjaunināt attēlu"
          action={updateItemImage}
          image={item.image}
        >
          <input type="hidden" name="id" value={item.id} />
        </FormImageContainer>
        <FormContainer action={updateItem}>
          <input type="hidden" name="id" value={item.id} />
          <div className="grid md:grid-cols-2 gap-8 mb-4 mt-8">
            <FormInput
              name="name"
              type="text"
              label="Nosaukums"
              defaultValue={item.name}
            />
            <FormPriceInput defaultValue={item.price}/>
            <FormCategoriesInput defaultValue={item.category} />
            <FormCitiesInput defaultValue={item.city} />
          </div>
          <FormDescriptionInput name="description" labelText="Apraksts" defaultValue={item.description} />
          <SubmitButton text="Rediģēt sludinājumu" className="mt-8"/>
        </FormContainer>
      </div>
    </section>
  );
}

export default EditRentPage;
