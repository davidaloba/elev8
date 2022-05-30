import { RootState, useAppSelector } from '@store'

import Image from 'next/image'

export const Points = () => {
  const { user } = useAppSelector((state: RootState) => state)

  return (<div className="bg-white border rounded-3xl mb-8 py-6 px-10 " >
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
  </div>)
}
