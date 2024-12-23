import Link from "next/link";
import { Button } from "../ui/button";

const EmptyList = ({
  heading = "Nekas nav atrasts",
  message = "Pamēģiniet citus variantus",
  btnText = "Atgriezties",
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) => {
  return <div className="mt-4">
    <h2 className="text-xl font-bold">{heading}</h2>
    <p className="text-lg">{message}</p>
    <Button asChild className="mt-2 capitalize" size="lg">
        <Link href="/">{btnText}</Link>
    </Button>
  </div>;
};

export default EmptyList;
