import Image from 'next/image'

export const Avatar = ({ src, alt, width, height }) => {
  return (
    <div>
      <Image src={src || '/avatar.png'} width={width} height={height} className="rounded-full  bg-slate-100 p-4" alt={alt} />
    </div>
  )
}
