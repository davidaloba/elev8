
import Link from 'next/link'
import { Logo } from '../logo'

export const Header = () => {
  return (
    <section className=" pt-10 mb-10 md:mb-12">
      <nav className='flex items-baseline justify-between  '>
        <Link href='./' passHref>
          <div className="flex items-center flex-shrink-0  mr-10 cursor-pointer">
            <Logo />
          </div>
        </Link>
      </nav>
    </section>
  )
}
