import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/utils/cities";

const name = "city";

function FormCitiesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Pilsēta
      </Label>
      <Select
        defaultValue={defaultValue || cities[0].label}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
            <SelectContent>
                {cities.map((item)=>{
                    return <SelectItem key={item.label} value={item.label}>
                        {item.label}
                    </SelectItem>
                })}
            </SelectContent>
      </Select>
    </div>
  );
}

export default FormCitiesInput;
