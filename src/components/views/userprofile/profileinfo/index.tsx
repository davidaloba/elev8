import { toggleEdit, logoutHandler } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'

import Image from 'next/image'
import { Avatar } from '@components'
import shortid from 'shortid'
import { useEffect } from 'react'

export const ProfileInfo = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  useEffect(() => {
    console.log('I generated ', shortid.generate())
    console.log(user.userInfo)
  }, [])

  const editProfile = async () => {
    dispatch(toggleEdit())
    window.scrollTo(0, 0)
  }

  return (<>

    {user.profile.tab === 'profile' && <div className=''>
      <div className=' bg-white border rounded-3xl py-6 px-10 '>
        <div className="flex flex-col items-center justify-center  my-10">
          <div className='rounded-full bg-green-500 p-4 my-6'>
            <Avatar src='/avatar.png' type={user.userInfo.userName} width='60' height='60' />
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
    </div>}

    {user.profile.tab === 'referrals' && <div className=" mb-8 py-6 " >
      <div className=" mb-8 py-6 px-10 ">
        <div className='flex flex-col items-center bg-gradient-to-br from-orange-200 to-green-200 rounded-3xl py-16 px-28 mb-36 '>
          <div className='mb-6'> Referral balance</div>
          <p className='text-3xl font-bold mb-6'>N25,000</p>
          <button
            className='cursor-pointer w-full text-xl text-white font-bold bg-green-600 border-0 py-2'
            onClick={() => { alert('withdrawHandler') }}
          > Withdraw </button>
        </div>
        <div className='flex flex-col items-center'>
          <div className='font-bold text-3xl mb-4'> Referral Code</div>
          <p className='text-xl'>The code below is your referral code. Share it with freinds and family to earn money on elev8</p>
          <div className='flex justify-between my-4'>
            <div className='border bg-white p-2 mr-3 '>{user.userInfo.referralCode}</div>
            <button
              className='cursor-pointer w-auto text-xl text-white font-bold  bg-green-600 border-0 py-2'
              onClick={() => {
                navigator.clipboard.writeText(user.userInfo.referralCode)
                alert('your refferal code has succesfully been copied to your clipboard')
              }}
            > Copy </button>
          </div>
        </div>
      </div>
      <div className='font-bold text-3xl mb-10'>History</div>
      <div className=' flex flex-col items-start bg-white border rounded-3xl mb-8 p-6 '>
        {/* {user.refferals.map((post) => */}
        <div key='' className='flex justify-between items-start w-full mb-8 p-4'>
          <div className="rounded-full  bg-green-500 h-min py-1 px-2 mr-4">
            <Image src='/avatar.png' width='24' height='24' alt='' />
          </div>
          <div className='mr-3'>
            <div className=" text-xl font-bold">Title</div>
            <div className=" text-xl ">Title</div>
          </div>
          <div className='mr-3'>
            <div className=" text-xl font-bold">Title</div>
            <div className=" text-xl ">Title</div>
          </div>
        </div>
        <div key='' className='flex justify-between items-start w-full mb-8 p-4'>
          <div className="rounded-full  bg-green-500 h-min py-1 px-2 mr-4">
            <Image src='/avatar.png' width='24' height='24' alt='' />
          </div>
          <div className='mr-3'>
            <div className=" text-xl font-bold">Title</div>
            <div className=" text-xl ">Title</div>
          </div>
          <div className='mr-3'>
            <div className=" text-xl font-bold">Title</div>
            <div className=" text-xl ">Title</div>
          </div>
        </div>
        <div key='' className='flex justify-between items-start w-full mb-8 p-4'>
          <div className="rounded-full  bg-green-500 h-min py-1 px-2 mr-4">
            <Image src='/avatar.png' width='24' height='24' alt='' />
          </div>
          <div className='mr-3'>
            <div className=" text-xl font-bold">Title</div>
            <div className=" text-xl ">Title</div>
          </div>
          <div className='mr-3'>
            <div className=" text-xl font-bold">Title</div>
            <div className=" text-xl ">Title</div>
          </div>
        </div>
        {/* )} */}

      </div>
    </div>}

    {user.profile.tab === 'coins' && <div className="bg-white border rounded-3xl mb-8 py-6 px-10 " >
      <div className="flex flex-col items-center justify-center rounded-3xl  p-4  " >
        <div className="rounded-full bg-indigo-700 p-4" ><Image src='/diamond.png' width='32' height='32' alt='name' /></div>
        <div className=" ">Points Balance</div>
        <div className=' text-3xl font-bold'>{user.userInfo.profile.points}  </div>
      </div>
      <div className="flex items-center justify-between my-4 ">
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
      </div>
    </div>}

    {user.profile.tab === 'saved' && <div className="bg-white border rounded-3xl mb-8 py-6 px-10 " >
      <div className='font-bold text-6xl text-center'>Comming Soon!!!</div>
    </div>}

  </>)
}
