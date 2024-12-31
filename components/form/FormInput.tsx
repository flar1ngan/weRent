import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
};

function FormInput(props: FormInputProps) {
  const { name, type, label, defaultValue } = props;
  return (
    <div className="">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} required className="mt-1" />
    </div>
  );
}

export default FormInput;
