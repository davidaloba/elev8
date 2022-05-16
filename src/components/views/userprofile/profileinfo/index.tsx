import { toggleEdit, logoutHandler } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import Image from 'next/image'
// import { Avatar } from '@components'

export const ProfileInfo = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  const editProfile = async () => {
    dispatch(toggleEdit())
    window.scrollTo(0, 0)
  }

  return (<>
    <div className=' bg-white border rounded-3xl mb-8 py-6 px-10 '>
      <div className=" mb-10 mx-6 p-6  " >
        <div className="flex flex-col items-center justify-center rounded-3xl  p-4  " >
          <div className="rounded-full bg-indigo-700 p-4" ><Image src='/diamond.png' width='32' height='32' alt='name' /></div>
          <div className=" ">Points Balance</div>
          <div className=' text-3xl font-bold'>{user.userInfo.profile.points}  </div>
        </div>
        {/* <div className="flex items-center justify-between my-4 ">
          <div className="flex items-start rounded-3xl border  p-4 justify-start" >
            <div className="mr-4">
              <Image src='/avatar.png' width='16' height='16' className="rounded-full" alt='name' />
            </div>
            <div>
              <div className="text-base font-bold ">Total points earned</div>
              <div className=''>1024 </div>
            </div>
          </div>
          <div className="flex items-start rounded-3xl border  p-4 justify-start" >
            <div className="mr-4">
              <Image src='/avatar.png' width='16' height='16' className="rounded-full" alt='name' />
            </div>
            <div>
              <div className="text-base font-bold ">Total points spent</div>
              <div className=''>1024 </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex items-center my-10 justify-center">
        {/* <Avatar src='/avatar.png' type={user.userInfo.userName} width='92' height='92' /> */}
        <button onClick={editProfile} className="mt-10 cursor-pointer w-11/12 text-xl text-green-700 font-bold bg-white border-green-600 hover:border-green-600 border-2 py-2 " > Edit profile
          </button>
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
    </div>
    <div className=' bg-white border rounded-3xl mb-8 py-6 px-10 '>
      <div className="flex justify-center items-center">
        <button onClick={logoutHandler} className="my-10 cursor-pointer w-11/12 text-xl text-white font-bold  bg-green-600 border-0 py-2 " >Logout
        </button>
      </div>
    </div>

  </>)
}
