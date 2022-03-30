import React from 'react'
import Image from 'next/image'

export const Avatar: React.FC = ({ avatar }) => {
  return (
    <Image alt="" src={avatar} width="96" height="58" />
  )
}
