import { Input } from "../ui/input";
import { Label } from "../ui/label";

function FormImage() {
  const name = "image";
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Attēls
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="max-w-xs"
      />
    </div>
  );
}

export default FormImage;
