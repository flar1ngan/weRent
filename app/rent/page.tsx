import EmptyList from "@/components/home/EmptyList";
import { getUserItems, deleteItem, getReservationList } from "@/utils/actions";
import { IconButton } from "@/components/form/FormButton";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/utils/format";
import FormContainer from "@/components/form/FormContainer";
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
  const rents = await getUserItems();
  if (rents.length === 0) {
    return (
      <EmptyList
        heading="Nav sludinājumu"
        message="Jūs varat izveidot jaunu sludinājumu!"
      />
    );
  }
  const reservations = await getReservationList();
  if (reservations.length === 0) return <EmptyList />;
  return (
    <div className="mt-16">
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
          {rents.map((rent) => {
            const { id: itemId, name, price, totalPriceSum } = rent;
            return (
              <TableRow key={itemId}>
                <TableCell>
                  <Link
                    href={`/items/${itemId}`}
                    className="underline tracking-wide"
                  >
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
            );
          })}
        </TableBody>
      </Table>
      <h4 className="mb-4 mt-12">
        Jūsu sludinājumiu rezervācijas: {rents.length}
      </h4>
      <Table>
        <TableCaption>Saraksts ar jūsu sludinājumu rezervācijām</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nosaukums</TableHead>
            <TableHead>Dienas</TableHead>
            <TableHead>Kopējie ienākumi</TableHead>
            <TableHead>No</TableHead>
            <TableHead>Līdz</TableHead>
            <TableHead>Rezervētājs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => {
            const {
              id,
              totalPrice,
              totalDays,
              startDate: firstDay,
              endDate: lastDay,
            } = reservation;
            const { id: itemId, name } = reservation.item;
            const { firstName, lastName } = reservation.profile;
            const startDate = formatDate(firstDay);
            const endDate = formatDate(lastDay);
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/items/${itemId}`}
                    className="underline tracking-wide"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{totalDays}</TableCell>
                <TableCell>{formatCurrency(totalPrice)}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
                <TableCell>{firstName + " " + lastName}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteItem({ itemId }: { itemId: string }) {
  const deleteItemAction = deleteItem.bind(null, { itemId });
  return (
    <FormContainer action={deleteItemAction}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default RentPage;
