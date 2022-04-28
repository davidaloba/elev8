import React from 'react'
import { useAppSelector } from '@store'

import { Home, Profile } from '@components'

/* TODO
  work on point system
  work on admin side
  work on form validations
 */

const App = (props) => {
  const { user } = useAppSelector((state: RootState) => state)
  console.log(user)

  return (
    <>
      {user.profile.menu
        ? <Profile/>
        : <Home header='Home' url='' />
        }
    </>
  )
}

export default App
