import { calculateTotal } from "@/utils/calendar"
import { formatCurrency } from "@/utils/format"
import { useItem } from "@/utils/store"
import { Card, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"


function RentForm() {
  const {range, price} = useItem((state)=>state)
  const startDate = range?.from as Date
  const endDate = range?.to as Date
  const {totalDays, totalPrice} = calculateTotal({startDate, endDate, price})
  return <Card className="p-8 mb-4">
    <CardTitle className="mb-8">Kopsavilkums</CardTitle>
    <Row label={`€${price} * ${totalDays} dienas`} amount={totalPrice} />
    <Separator className="mt-4" />
    <CardTitle className="mt-8">
      <Row label="Kopējā nomas summa" amount={totalPrice} />
    </CardTitle>
  </Card>
}

function Row({label, amount}:{label:string, amount: number}) {
  return <p className="text-sm mb-2 flex justify-between">
    <span>{label}</span>
    <span>{formatCurrency(amount)}</span>
  </p>
}

export default RentForm