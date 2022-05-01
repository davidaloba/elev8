
import Link from 'next/link'
import { Logo } from '../logo'

export const Header = () => {
  return (
    <section className=" pt-10 mb-10 md:mb-12">
      <nav className='flex items-baseline justify-between  '>
        <Link href='./' passHref>
          <div className="flex items-center flex-shrink-0  mr-10">
            <Logo />
          </div>
        </Link>

        <a href="http://forms.gle/HapRsSLZ8zcxxVzc6">
          <button className='mt-4 py-2 rounded-2xl border-none bg-green-700  text-white font-semibold'>Get started</button>
        </a>
        {/* {!userInfo
          ? <div onClick={() => router.push('/login')} className="pt-5 cursor-pointer ">
            <div className="text-lg font-bold ">[LOGIN/REGISTER]</div>
          </div>
          : <div onClick={() => router.push('/app')} className="pt-5 cursor-pointer ">
            <div className="text-lg font-bold ">[HOME]</div>
          </div>
        } */}
      </nav>
    </section>
  )
}
