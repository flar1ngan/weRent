"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import SectionName from "./SectionName";

function Description({ description }: { description: string }) {
  const [isFull, setIsFull] = useState(false);

  const text = description.split(" ");
  const isLong = text.length > 100;
  const toggle = () => {
    setIsFull(!isFull);
  };
  const activeDescription =
    isLong && !isFull ? text.splice(0, 100).join(" ") + "..." : description;
  return (
    <article className="mt-4">
      <SectionName text="Apraksts" />
      <p className="font-light leading-6 text-muted-foreground">
        {activeDescription}
      </p>
      {isLong && (
        <Button variant="link" className="pl-0" onClick={toggle}>
            {isFull ? "Rādīt mazāk" : "Rādīt vairāk"}
        </Button>
      )}
    </article>
  );
}

export default Description;
