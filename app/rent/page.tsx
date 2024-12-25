import EmptyList from "@/components/home/EmptyList"
import { getUserItems, deleteItem } from "@/utils/actions"
import { IconButton } from "@/components/form/FormButton"
import Link from "next/link"
import { formatCurrency } from "@/utils/format"
import FormContainer from "@/components/form/FormContainer"
import {
    Table,
    TableBody,
    TableCell,
    TableCaption,
    TableHeader,
    TableHead,
    TableRow,
  } from "@/components/ui/table";

async function RentPage() {
    const rents = await getUserItems()
    if(rents.length===0) {
        return <EmptyList heading="Nav sludinājumu" message="Jūs varat izveidot jaunu sludinājumu!"/>
    }
  return <div className="mt-16">
    <h4 className="mb-4">Sludinājumi: {rents.length}</h4>
    <Table>
        <TableCaption>Saraksts ar jūsu sludinājumiem</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Nosaukums</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead>Kopējie ienākumi</TableHead>
                <TableHead>Darbības</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {rents.map((rent)=>{
                const {id:itemId, name, price, totalPriceSum} = rent
                return <TableRow key={itemId}>
                    <TableCell>
                        <Link href={`/items/${itemId}`} className="underline tracking-wide">
                        {name}
                        </Link>
                    </TableCell>
                    <TableCell>{formatCurrency(price)}</TableCell>
                    <TableCell>{formatCurrency(totalPriceSum)}</TableCell>
                    <TableCell className="flex items-center gap-x-2">
                        <Link href={`/rent/${itemId}/edit`}>
                            <IconButton actionType="edit" />
                        </Link>
                        <DeleteItem itemId={itemId} />
                    </TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
  </div>
}

function DeleteItem({itemId}:{itemId:string}){
    const deleteItemAction = deleteItem.bind(null,{itemId})
    return <FormContainer action={deleteItemAction}>
        <IconButton actionType="delete" />
    </FormContainer>
}

export default RentPage