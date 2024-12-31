import EmptyList from "@/components/home/EmptyList";
import Link from "next/link";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/FormButton";
import { getReservations, deleteReservation } from "@/utils/actions";
import { formatDate, formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

async function ReservationsPage() {
  const reservations = await getReservations();
  if (reservations.length === 0) return <EmptyList message="Jums pašlaik nav rezervāciju" />;
  return (
    <div>
      <h4 className="mb-4 font-semibold text-2xl">Jūsu rezervācijas ({reservations.length})</h4>
      <Table>
        <TableCaption>Jūsu rezervācijas saraksts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nosaukums</TableHead>
            <TableHead>Dienas</TableHead>
            <TableHead>Cena</TableHead>
            <TableHead>No</TableHead>
            <TableHead>Līdz</TableHead>
            <TableHead>Autors</TableHead>
            <TableHead>Darbības</TableHead>
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
            const startDate = formatDate(firstDay);
            const endDate = formatDate(lastDay);
            const {username, firstName, lastName} = reservation.item.profile
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/items/${itemId}`}
                    className="tracking-wide underline"
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
                    <p className="underline">{firstName + " " + lastName}</p>
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteReservation rentId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteReservation({ rentId }: { rentId: string }) {
  const deleteReservationAction = deleteReservation.bind(null, { rentId });
  return (
    <FormContainer action={deleteReservationAction}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default ReservationsPage;
