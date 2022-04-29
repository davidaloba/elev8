import React from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { Logo } from '..'

export const Intro: React.FC = ({ header }) => {
  const router = useRouter()

  console.log()

  return (
    <section className="">
      <nav className='flex items-center justify-start  mt-4 mb-16 md:mb-12'>
        <div className="flex items-center flex-shrink-0  mr-10">
          <Logo />
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link href={router.pathname}><a className="hover:underline">{header}.</a></Link>
        </h1>

      </nav>
    </section>
  )
}
