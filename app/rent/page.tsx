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
import { SheetEditRent } from "@/components/rent/SheetEditRent";

async function RentPage() {
  const rents = await getUserItems();
  if (rents.length === 0) {
    return (
      <EmptyList
        message="Jums pašlaik nav sludinājumu"
      />
    );
  }
  const reservations = await getReservationList();
  return (
    <div>
      <h4 className="mb-4 font-semibold text-2xl">Jūsu sludinājumi ({rents.length})</h4>
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
                  <SheetEditRent itemId={itemId}/>
                  <DeleteItem itemId={itemId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <h4 className="mb-4 mt-12 font-semibold text-2xl">
        Jūsu sludinājumu rezervācijas ({reservations.length})
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
            const { firstName, lastName, username } = reservation.profile;
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
                <TableCell>
                  <Link href={`/profile/${username}`}>
                  <p className="underline">
                    {firstName + " " + lastName}
                    </p>
                  </Link>
                  </TableCell>
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
