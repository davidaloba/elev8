import React from 'react'
import Image from 'next/image'

export const Avatar: React.FC = ({ src, alt, width, height }) => {
  return (
      <div >
      {alt === 'task' && (<Image src='/avatar.png' width={width} height={height} className="rounded-full" alt={alt} />)}
      {alt === 'freebie' && (<Image src='/avatar.png' width={width} height={height} className="rounded-full" alt={alt} />)}
      {alt === 'premium' && (<Image src='/avatar.png' width={width} height={height} className="rounded-full" alt={alt} />)}
      {alt !== ('task' || 'freebie' || 'premium') && (<Image src={src || '/avatar.png'} width={width} height={height} className="rounded-full" alt={alt} />)}
      </div>
  )
}
