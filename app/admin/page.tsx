import { StatsLoadingContainer } from "@/components/admin/Loading";
import StatsContainer from "@/components/admin/StatsContainer";
import { IconButton } from "@/components/form/FormButton";
import FormContainer from "@/components/form/FormContainer";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { deleteItem, getAllItems } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Suspense } from "react";

async function AdminPage() {
  const items = await getAllItems();
  return (
    <>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
        <div className="mt-16">
          <h4 className="mb-4">Sludinājumi: {items.length}</h4>
          <Table>
            <TableCaption>Saraksts ar visiem sludinājumiem</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nosaukums</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead>Kategorija</TableHead>
                <TableHead>Autors</TableHead>
                <TableHead>Darbības</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const { id: itemId, name, price, category } = item;
                const {firstName, lastName}  = item.profile
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
                    <TableCell>{category}</TableCell>
                    <TableCell>{firstName + " " + lastName}</TableCell>
                    <TableCell className="flex items-center gap-x-2">
                      <DeleteItem itemId={itemId} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Suspense>
    </>
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

export default AdminPage;
