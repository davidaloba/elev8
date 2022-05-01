import React from 'react'
import Image from 'next/image'

export const Logo: React.FC = () => {
  return (
    <Image src="/logo.png" alt="nextjs" width="120" height="60" />
  )
}
