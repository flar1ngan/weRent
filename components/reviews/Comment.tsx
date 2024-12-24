"use client"
import { useState } from "react"
import { Button } from "../ui/button"

function Comment({comment}:{comment:string}) {
  const [isFull, setIsFull] = useState(false);
  const toggle = () => {
    setIsFull(!isFull);

  }
  const bigComment = comment.length > 150
  const activeComment = bigComment && !isFull ? `${comment.slice(0,150)}...`: comment;
  return <div>
    <p className="text-sm">{activeComment}</p>
    {bigComment && <Button variant="link" className="pl-0 text-muted-foreground" onClick={toggle}>
      {isFull ? "Rādīt mazāk" : "Rādīt vairāk"}</Button>}
  </div>
}

export default Comment