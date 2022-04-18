import React from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@store'
import { signout } from '@store/actions'
import Cookies from 'js-cookie'

import { Logo, Button } from '@components'

export const Header: React.FC = ({ header, url }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const signoutHandler = () => {
    dispatch(signout())
    Cookies.remove('userInfo')
    router.push('/login')
  }
  return (
    <nav className='flex items-center justify-between flex-wrap '>
      <div className="flex items-center flex-shrink-0  mr-6">
          <Logo/>
      </div>
      <div className="flex items-center flex-shrink-0 ">
        <Button onClick={signoutHandler} className="text-xl">Log Out</Button>
      </div>
    </nav>
  )
}
