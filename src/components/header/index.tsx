import React from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store'
import { setSearchTerm, toggleMenu } from '@store/actions'
import Cookies from 'js-cookie'

import Image from 'next/image'
import { Logo, Button, Avatar } from '@components'

export const Header: React.FC = ({ header, url }) => {
  const { user, posts } = useAppSelector((state: RootState) => state)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const searchValue = React.useRef('')

  const searchPost = () => {
    dispatch(setSearchTerm(searchValue.current.value))
  }

  const openMenu = () => {
    dispatch(toggleMenu())
  }

  return (
    <section className='mb-8 p-4'>
      <form className='flex items-center justify-between'>
        <input
          type="text"
          id="searchPost"
          ref={searchValue}
          onChange={searchPost}
          name="searchPost"
          placeholder='Search posts...'
          // value={reply}
          // onChange={(e) => setReply(e.target.value)}
          className='text-lg h-auto mr-8 w-full border-[1px] border-slate-200'
        ></input>

        <div className='flex flex-wrap rounded-full mr-2'>
          <div onClick={openMenu} className='rounded-lg cursor-pointer bg-lime-700 '>
            <Image src='/icons/linkedin-icon.svg' width='16' height='16' alt='points' />
          </div>
          <p className='text-base'> { user.userInfo.points ? user.userInfo.points : 0}  Pts</p>
        </div>

        <div onClick={openMenu} className=" cursor-pointer">
          <Avatar src='/avatar.png' type={user.userInfo.userName} width='50' height='50' />
        </div>
      </form>
    </section>
  )
}
