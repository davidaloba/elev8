import { RootState, useAppDispatch, useAppSelector } from '@store'
import { toggleMenu } from '@store/actions'

import Image from 'next/image'
import { Avatar } from '@components'

export const AppBar = () => {
  const { user } = useAppSelector((state: RootState) => state)
  const dispatch = useAppDispatch()

  // const searchValue = React.useRef('')

  // const searchPost = () => {
  //   dispatch(setSearchTerm(searchValue.current.value))
  // }

  const openMenu = () => {
    dispatch(toggleMenu())
  }

  return (
    <section className=' p-4'>
      <form className='flex items-center justify-between'>
        <div className='w-full'></div> {/* Place holder for search bar */}
        {/* <input
          type="text"
          id="searchPost"
          ref={searchValue}
          onChange={searchPost}
          name="searchPost"
          placeholder='Search posts...'
          // value={reply}
          // onChange={(e) => setReply(e.target.value)}
          className='text-lg h-auto mr-8 w-full border-[1px] border-slate-200'
        ></input> */}
        <div className='flex flex-wrap rounded-full mr-2'>
          <div onClick={openMenu} className='rounded-full cursor-pointer bg-indigo-700 p-1 '>
            <Image src='/diamond.png' width='16' height='16' alt='points' />
          </div>
          <p className='text-base'> {user.userInfo.profile.points ? user.userInfo.profile.points : 0}  Pts</p>
        </div>
        <div onClick={openMenu} className=" cursor-pointer">
          <Avatar src='/avatar.png' type={user.userInfo.userName} width='50' height='50' />
        </div>
      </form>
    </section>
  )
}
