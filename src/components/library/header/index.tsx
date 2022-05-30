
import Link from 'next/link'
import { Logo } from '../logo'

export const Header = () => {
  return (
    <section className=" pt-10 mb-10 md:mb-12">
      <nav className='flex  justify-between  '>
        <Link href='./' passHref>
          <div className="flex items-center flex-shrink-0  mr-10 cursor-pointer">
            <Logo />
          </div>
        </Link>
        <Link href="/login/?register=false" passHref >
          <button className='my-6 py-2 rounded-2xl border-none bg-orange-500  text-white font-semibold'>
            Login
          </button>
        </Link>
      </nav>
    </section>
  )
}
