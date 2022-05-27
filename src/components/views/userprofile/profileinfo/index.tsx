import { RootState, useAppSelector } from '@store'

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

  </>)
}
