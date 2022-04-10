import React from 'react'
import Link from 'next/link'

import { Logo } from '@components'

export const Header: React.FC = ({ header, url }) => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href={url}>
        <a className="hover:underline">{header}</a>
      </Link>
      .
    </h2>
  )
}
