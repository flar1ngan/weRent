import { Card, CardHeader } from "../ui/card";

type StatsCardType = {
    title:string;
    value:number;
}

function StatsCard({title, value}:StatsCardType) {
  return <Card>
    <CardHeader className="flex flex-row justify-between items-center">
        <h3 className="capitalize text-3xl font-semibold">{title}</h3>
        <span className="text-primary text-5xl font-bold">{value}</span>
    </CardHeader>
  </Card>
}

export default StatsCard