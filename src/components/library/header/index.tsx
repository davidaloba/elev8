import React from 'react'
import { useRouter } from 'next/router'

import { useAppSelector, RootState } from '@store'

import Link from 'next/link'
import { Logo } from '../logo'

export const Header: React.FC = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.user)

  const router = useRouter()

  return (
    <section className=" pt-10 mb-10 md:mb-12">
      <nav className='flex items-baseline justify-between  '>
        <Link href='./' passHref>
          <div className="flex items-center flex-shrink-0  mr-10">
            <Logo />
          </div>
        </Link>

        {!userInfo
          ? <div onClick={() => router.push('/login')} className="pt-5 cursor-pointer ">
            <div className="text-lg font-bold ">[LOGIN/REGISTER]</div>
          </div>
          : <div onClick={() => router.push('/app')} className="pt-5 cursor-pointer ">
            <div className="text-lg font-bold ">[HOME]</div>
          </div>
        }
      </nav>
    </section>
  )
}
