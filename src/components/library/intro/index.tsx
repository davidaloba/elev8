
import Link from 'next/link'
import { Logo } from '../logo'

export const Intro = ({ title }) => {
  console.log()

  return (
    <section className=" pt-10 mb-10 md:mb-12">
      <nav className='flex items-baseline justify-between  '>
        <Link href='./' passHref>
          <div className="flex items-center flex-shrink-0  mr-10">
            <Logo />
          </div>
        </Link>

        <div>
          <h1 className="text-5xl font-bold tracking-tighter leading-tight">
            {title}
          </h1>
        </div>
      </nav>

    </section>
  )
}
