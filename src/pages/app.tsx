import React from 'react'
import { useAppSelector } from '@store'

import { Home, Profile } from '@components'

const Index = (props) => {
  const { user } = useAppSelector((state: RootState) => state)

  return (
    <>
      {user.profile.menu
        ? <Profile/>
        : <Home header='Home' url='' />
        }
    </>
  )
}

export default Index
