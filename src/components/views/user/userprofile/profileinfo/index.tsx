import { RootState, useAppSelector } from '@store'

import Link from 'next/link'
import Image from 'next/image'
import { Referral } from './referral'
import { Profile } from './profile'
import { Points } from './points'

export const ProfileInfo = () => {
  const { user } = useAppSelector((state: RootState) => state)

  return (<>
    {user.profile.tab === 'profile' && <Profile />}
    {user.profile.tab === 'referrals' && <Referral />}
    {user.profile.tab === 'coins' && <Points />}
    {user.profile.tab === 'saved' && <div className="bg-white border rounded-3xl mb-8 py-6 px-10 " >
      <div className='font-bold text-6xl text-center'>Comming Soon!!!</div>
    </div>}

    {user.profile.tab === 'support' && <div className="bg-white border rounded-3xl mb-8 py-6 px-10 min-h-screen " >
      <div className="flex flex-col items-center justify-center  my-24">
        <div className='rounded-full bg-green-500 p-4 my-6'>
          <Image src='/customer-service.png' alt='customer-support-icon' width='60' height='60' />
        </div>
        <div className='font-bold text-center text-2xl mb-10'>Chat with us on Telegram or WhatsApp for all inquiries, feedback and complaints</div>
      </div>

      <div className="flex justify-around items-center mt-36">
        <div className='  bg-gradient-to-br from-green-200 to-orange-200 rounded-full p-8 cursor-pointer '>
          <Link href="https://wa.me/2348069947791" passHref >
            <a target="_blank">
              <Image src='/whatsapp.png' width='96' height='96' alt='WhatsApp' />
            </a>
          </Link>
        </div>
        <div className=' bg-gradient-to-br from-orange-200 to-green-200 rounded-full p-8 cursor-pointer'>
          <Link href="https://t.me/elev8ng" target='_blank' passHref >
            <a target="_blank">
              <Image src='/telegram.png' width='96' height='96' alt='Telegram' />
            </a>
          </Link>
        </div>
        <div className='  bg-gradient-to-br from-green-200 to-orange-200 rounded-full p-8 cursor-pointer'>
          <Link href="https://wa.me/2347063139613" passHref >
            <a target="_blank">
              <Image src='/whatsapp.png' width='96' height='96' alt='WhatsApp' />
            </a>
          </Link>
        </div>
      </div>
    </div>}

  </>)
}
