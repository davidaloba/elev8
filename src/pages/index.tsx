import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { RootState, useAppSelector } from '@store'

import {
  Container,
  Intro,
  Footer
} from '@components'

const Index: React.FC = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (userInfo) {
      router.push('/app')
    }
  }, [router, userInfo])

  console.log(userInfo)

  return (
    <>
      <Container>
        <Intro header='Login' url='/login' />
        <Footer />
      </Container>
    </>
  )
}

export default Index
