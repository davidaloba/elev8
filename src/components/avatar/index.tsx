import React from 'react'
import Image from 'next/image'

export const Avatar: React.FC = ({ avatar }) => {
  return (
    <Image alt="" src={avatar} width="42" height="42" />
  )
}
