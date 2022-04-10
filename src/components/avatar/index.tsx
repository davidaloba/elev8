import React from 'react'
import Image from 'next/image'

export const Avatar: React.FC = ({ author }) => {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={author.avatar}
          layout="fill"
          className="rounded-full"
          alt={author.name}
        />
      </div>
      <div className="text-xl font-bold">{author.name}</div>
    </div>
    // <Image alt="" src={avatar} width="42" height="42" />
  )
}
