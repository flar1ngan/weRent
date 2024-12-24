import { FaStar, FaRegStar } from "react-icons/fa"

function Rating({rating}:{rating:number}) {
  const stars = Array.from({length:5}, (_,i) => i + 1 <=rating)
  return <div className="flex gap-x-1 items-center">
    {stars.map((filled,i)=>{
      const className = `w-3 h-3 ${filled ? "text-primary": "text-gray-300"}`
      return filled ? <FaStar className={className} key={i} />: <FaRegStar className={className} key={i} />
    })}
  </div>
}

export default Rating 