import { Skeleton } from "../ui/skeleton"

function RentLoading({rows}:{rows?:number}) {
    const tableRows = Array.from({length:rows || 4}, (_,i)=>{
        return <div className="mb-4" key={i}>
            <Skeleton className="h-8 w-full rounded" />
        </div>
    })
  return <>{tableRows}</>
}

export default RentLoading