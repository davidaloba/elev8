import { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '@store'

import { Container, Home, Intro, Profile } from '@components'
import router from 'next/router'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { userInfo, profile } = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    userInfo.isAdmin ? router.push('/admin') : setIsLoading(false)
  }, [userInfo])

  return (<>
    {isLoading
      ? <header className='pt-4 pb-6 sticky top-0 z-50 bg-white'>
        <Container>
          <Intro title='Loading...' />
        </Container>
      </header>
      : <div className=' bg-stone-100'>
      {profile.menu
        ? <Profile />
        : <Home title='Home' url='' />
      }
    </div>
    }
  </>)
}

export default App
