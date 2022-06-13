import { toggleEdit, logoutHandler } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import Image from 'next/image'
import { Avatar } from '@components'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  const editProfile = async () => {
    dispatch(toggleEdit())
    window.scrollTo(0, 0)
  }

  return (<div className=''>
    <div className=' bg-white border rounded-3xl py-6 px-10 '>
      <div className="flex flex-col items-center justify-center  my-10">
        <div className=' my-6'>
          <Avatar src={user.userInfo.profile.avatar || '/avatar.png' } alt={user.userInfo.userName} width='120' height='120' />
        </div>
        <div className='font-bold'> {user.userInfo.userName}</div>
      </div>
      <div>
        <div className='font-bold text-3xl mb-10'>Personal Info</div>
        <div className="flex items-center border-b mb-4 p-4 justify-start" >
          <div className="mr-4 bg-green-700 rounded-full pt-1 px-1">
            <Image src='/avatar.png' width='16' height='16' className="rounded-full" alt='name' />
          </div>
          <div>
            <div>Name</div>
            <div className='font-bold'> {user.userInfo.profile.firstName} {user.userInfo.profile.lastName}  </div>
          </div>
        </div>
        <div className="flex items-center  border-b mb-4 p-4 justify-start" >
          <div className="mr-4 bg-green-700 rounded-full pt-1 px-1">
            <Image src='/call.png' width='16' height='16' className="rounded-full" alt='name' />
          </div>
          <div>
            <div>Phone Number</div>
            <div className='font-bold'> {user.userInfo.profile.phone} </div>
          </div>
        </div>
        <div className=" border-b mb-4 p-4">
          <div>
            <div className="flex items-center p-2 justify-start" >
              <div className="mr-4 bg-green-700 rounded-full pt-1 px-1">
                <Image src='/facebook.png' width='16' height='16' className="rounded-full" alt='name' />
              </div>
              <div>
                <div>Facebook: <span className='font-bold'> @{user.userInfo.profile.facebook} </span>
                </div>
              </div>
            </div>
            <div className="flex items-center p-2 justify-start" >
              <div className="mr-4 bg-green-700 rounded-full pt-1 px-1">
                <Image src='/instagram.png' width='16' height='16' className="rounded-full" alt='name' />
              </div>
              <div>
                <div>Instagram: <span className='font-bold'> @{user.userInfo.profile.instagram}  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center p-2 justify-start" >
              <div className="mr-4 bg-green-700 rounded-full pt-1 px-1">
                <Image src='/twitter.png' width='16' height='16' className="rounded-full" alt='name' />
              </div>
              <div>
                <div>Twitter: <span className='font-bold'> @{user.userInfo.profile.twitter} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center  border-b mb-4 p-4 justify-start" >
          <div className="mr-4 bg-green-700 rounded-full pt-1 px-1">
            <Image src='/email.png' width='16' height='16' className="rounded-full" alt='name' />
          </div>
          <div>
            <div>Email</div>
            <div className='font-bold'> {user.userInfo.email}  </div>
          </div>
        </div>
        <div className="flex items-center  border-b mb-4 p-4 justify-start" >
          <div className="mr-4 bg-green-700 rounded-full pt-1 px-1">
            <Image src='/calendar.png' width='16' height='16' className="rounded-full" alt='name' />
          </div>
          <div>
            <div>D.O.B</div>
            <div className='font-bold'> {user.userInfo.profile.dob} </div>
          </div>
        </div>
      </div>
      <button onClick={editProfile} className="my-10 cursor-pointer w-11/12 text-xl text-green-700 font-bold bg-white border-green-600 hover:border-green-600 border-2 py-2 " > Edit profile</button>
    </div>
    <div className=' bg-white border rounded-3xl mt-8 py-6 px-10 '>
      <div className="flex justify-center items-center">
        <button onClick={logoutHandler} className="my-10 cursor-pointer w-11/12 text-xl text-white font-bold  bg-green-600 border-0 py-2 " >Logout
        </button>
      </div>
    </div>
  </div>
  )
}
