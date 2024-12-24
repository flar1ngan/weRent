import Image from "next/image"

function ImageContainer({image, name}: {image:string, name:string}) {
  return <section className="h-[300px] md:h-[500px] relative mt-6">
    <Image src={image} fill alt={name} className="object-cover rounded" priority/>
  </section>
}

export default ImageContainer