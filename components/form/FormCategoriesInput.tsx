import { categories } from "@/utils/categories";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const name = "category";

function FormCategoriesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Kategorija
      </Label>
      <Select
        defaultValue={defaultValue || categories[0].label}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
            <SelectContent>
                {categories.map((item)=>{
                    return <SelectItem key={item.label} value={item.label}>
                        {item.label}
                    </SelectItem>
                })}
            </SelectContent>
      </Select>
    </div>
  );
}

export default FormCategoriesInput;