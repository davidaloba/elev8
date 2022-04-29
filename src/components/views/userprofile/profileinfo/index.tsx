import React from 'react'
import { toggleEdit } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import Image from 'next/image'
import { Avatar } from '@components'

export const ProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  const editProfile = async () => {
    dispatch(toggleEdit())
    window.scrollTo(0, 0)
  }

  return (
    <div className='  border rounded-3xl mb-8 p-6 '>
      <div className="flex items-center my-10 justify-center">
        <Avatar src='/avatar.png' type={user.userInfo.userName} width='92' height='92' />
      </div>
      <div className=" mb-10 mx-6 p-6 " >
        <div className="flex flex-col items-center justify-center rounded-3xl border  p-4  " >
          <div className=""><Image src='/avatar.png' width='32' height='32' className="rounded-full" alt='name' /></div>
          <div className=" ">Points Balance</div>
          <div className=' text-3xl font-bold'>{user.userInfo.profile.points}  </div>
        </div>
        {/* <div className="flex items-center justify-between my-4 ">
          <div className="flex items-start rounded-3xl border  p-4 justify-start" >
            <div className="mr-4">
              <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
            </div>
            <div>
              <div className="text-base font-bold ">Total points earned</div>
              <div className=''>1024 </div>
            </div>
          </div>
          <div className="flex items-start rounded-3xl border  p-4 justify-start" >
            <div className="mr-4">
              <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
            </div>
            <div>
              <div className="text-base font-bold ">Total points spent</div>
              <div className=''>1024 </div>
            </div>
          </div>
        </div> */}
      </div>
      <div>
        <div className="flex items-center border mb-4 p-4 justify-start" >
          <div className="mr-4">
            <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
          </div>
          <div>
            <div>Name</div>
            <div className='font-bold'> {user.userInfo.profile.firstName} {user.userInfo.profile.lastName}  </div>
          </div>
        </div>
        <div className="flex items-center border mb-4 p-4 justify-start" >
          <div className="mr-4">
            <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
          </div>
          <div>
            <div>Phone Number</div>
            <div className='font-bold'> {user.userInfo.profile.phone} </div>
          </div>
        </div>
        <div className="border mb-4 p-4">
          <div className="flex items-center mb-4 justify-start" >
            <div className="mr-4">
              <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
            </div>
            <div>Social Media</div>
          </div>
          <div>
            <div className="flex items-center p-2 justify-start" >
              <div className="mr-4">
                <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
              </div>
              <div>
                <div>Facebook: <span className='font-bold'> @{user.userInfo.profile.facebook} </span>
                </div>
              </div>
            </div>
            <div className="flex items-center p-2 justify-start" >
              <div className="mr-4">
                <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
              </div>
              <div>
                <div>Instagram: <span className='font-bold'> @{user.userInfo.profile.instagram}  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center p-2 justify-start" >
              <div className="mr-4">
                <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
              </div>
              <div>
                <div>Twitter: <span className='font-bold'> @{user.userInfo.profile.twitter} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center border mb-4 p-4 justify-start" >
          <div className="mr-4">
            <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
          </div>
          <div>
            <div>Email</div>
            <div className='font-bold'> {user.userInfo.email}  </div>
          </div>
        </div>
        <div className="flex items-center border mb-4 p-4 justify-start" >
          <div className="mr-4">
            <Image src='/avatar.png' width='15' height='15' className="rounded-full" alt='name' />
          </div>
          <div>
            <div>D.O.B</div>
            <div className='font-bold'> {user.userInfo.profile.dob} </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <div onClick={editProfile} className="cursor-pointer" >[UPDATE PROFILE]
        </div>
      </div>

    </div>
  )
}
