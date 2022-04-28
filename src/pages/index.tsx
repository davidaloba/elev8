import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RootState, useAppSelector, useAppDispatch } from '@store'
import { login } from '@store/actions'
import { getError } from '@db/error'
import Cookies from 'js-cookie'
import axios from 'axios'

import {
  Container,
  Intro,
  Footer
} from '@components'

const Index = () => {
  const { userInfo, loading } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { redirect } = router.query // login?redirect=/shipping

  useEffect(() => {
    if (userInfo) {
      router.push('/app')
    }
  }, [router, userInfo])

  console.log(userInfo)

  return (
    <>
      <Container>
        <Intro header='Login' url='/' />
        <Footer />
      </Container>
    </>
  )
}

export default Index
