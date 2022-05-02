import { useEffect } from 'react'
import { RootState, useAppSelector } from '@store'

import { Home, Profile } from '@components'
import router from 'next/router'

/* TODO
  work on admin side
  work on form validations
 */

const App = () => {
  const { userInfo, profile } = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    if (userInfo.isAdmin) router.push('/admin')
  }, [userInfo])

  return (
    <div className=' bg-stone-100'>
      {profile.menu
        ? <Profile />
        : <Home title='Home' url='' />
      }
    </div>
  )
}

export default App
