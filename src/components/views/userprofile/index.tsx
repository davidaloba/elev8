import { toggleMenu } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import Image from 'next/image'
import { Container } from '@components'
import { EditProfile } from './profileedit'
import { ProfileInfo } from './profileinfo'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  const closeMenu = async () => {
    dispatch(toggleMenu())
  }

  return (
    <div className='bg-slate-100'>
      <header className='pt-10 pb-6 sticky top-0 z-50 '>
        <Container>
          <div className="flex justify-start mt-8 items-center">
            {!user.profile.edit && <div onClick={closeMenu} className="cursor-pointer pb-1 pt-2 px-2 bg-white rounded-full " >
              <Image src='/close.png' width='20' height='20' alt='[CLOSE]' />
              </div>}
          </div>
        </Container>
        {/* <Alert preview={preview} /> */}
      </header>
      <main className="min-h-screen">
        <Container >
          {user.profile.edit
            ? <EditProfile />
            : <ProfileInfo />
          }
        </Container>
      </main>
      <footer className="border-b bg-accent-1 border-accent-2">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-base">Elev8 © copyright 2022</p>
        </div>
      </footer>
    </div>
  )
}
