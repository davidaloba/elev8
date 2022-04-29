import React, { useEffect } from 'react'
import { RootState, useAppSelector } from '@store'

import { Home, Profile } from '@components'
import router from 'next/router'

/* TODO
  work on admin side
  work on form validations
 */

const App: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state)
  console.log(user)

  useEffect(() => {
    if (!user.userInfo) {
      router.push('/login')
    }
    if (user.userInfo.isAdmin) router.push('/admin')
  }, [user.userInfo])

  return (
    <>
      {user.profile.menu
        ? <Profile />
        : <Home header='Home' url='' />
      }
    </>
  )
}

export default App
