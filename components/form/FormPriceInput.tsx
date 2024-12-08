import { Label } from '../ui/label'
import { Input } from '../ui/input'

type PriceInputProps = {
    defaultValue?:number;
}

function FormPriceInput({defaultValue}:PriceInputProps) {
    const name = "price"
  return (
    <div className='mb-2'>
        <Label htmlFor={name}>
            Cena (€/dienā)
        </Label>
        <Input id={name} type='number' name={name} min={0} defaultValue={defaultValue || 0} required/>
    </div>
  )
}

export default FormPriceInput