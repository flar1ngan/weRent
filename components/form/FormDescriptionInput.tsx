import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type DescriptionInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function FormDescriptionInput({
  name,
  labelText,
  defaultValue,
}: DescriptionInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name}>
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue || description}
        rows={3}
        required
      />
    </div>
  );
}

const description =
  "";

export default FormDescriptionInput;
