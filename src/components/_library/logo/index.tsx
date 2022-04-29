import React from 'react'
import Image from 'next/image'

export const Logo: React.FC = () => {
  return (
    <Image src="/avatar.png" alt="nextjs" width="60" height="60" />
  )
}
