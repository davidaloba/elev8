import { RootState, useAppDispatch, useAppSelector } from '@store'
import { fetchReferralData, numberWithCommas, setRequestWithdrawal } from '@store/actions'
import Image from 'next/image'
import { useEffect } from 'react'

export const Referral = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state)

  useEffect(() => {
    fetchReferralData(user.userInfo.referralCode, user.userInfo.email)
  }, [dispatch, user.userInfo])

  const totalEarnings = !user.referral.loading && numberWithCommas(user.referral.data.totalEarnings)
  const totalWithdrawals = !user.referral.loading && numberWithCommas(user.referral.data.totalWithdrawals)
  const referralBalance = !user.referral.loading && numberWithCommas(user.referral.data.balance)
  const withdraw = () => {
    dispatch(setRequestWithdrawal(true))
  }

  return (<>
    {user.referral.loading
      ? <div className=" mb-8 py-6 " >
        <div>
          Loading...
        </div>
      </div>
      : <div className=" mb-8 py-6" >
        <div className=" mb-8 py-6 px-10 ">
          <div className='flex flex-col items-center bg-gradient-to-br from-orange-200 to-green-200 rounded-3xl py-16 px-28 mb-12 '>
            <div className='mb-6'> Referral balance</div>
            <p className='text-3xl font-bold mb-6'>N{referralBalance}</p>
            {user.referral.data.balance > 3000
              ? <button
                className='cursor-pointer w-full text-xl text-white font-bold bg-green-600 border-0 py-2'
                onClick={() => withdraw()}
              > Request Withdrawal </button>
              : <button
                disabled={true}
                className='w-full text-xl text-white font-bold bg-gray-400 hover:border-0 border-0 py-2'
              > Request Withdrawal </button>}
          </div>
          <div className="flex justify-between items-center mb-36">
            <div className='flex justify-between items-start p-4 bg-gradient-to-br from-green-200 to-orange-200 rounded-3xl py-8 px-4'>
              <div className=" mr-4">
                <Image src='/avatar.png' width='12' height='12' alt='' />
              </div>
              <div className='mr-3'>
                <div className=" text-lg mb-2 ">Total amount earned</div>
                <div className=" text-xl font-bold">N{totalEarnings}</div>
              </div>
            </div>
            <div className='flex justify-between items-start p-4 bg-gradient-to-br from-orange-200 to-green-200 rounded-3xl py-8 px-4'>
              <div className=" mr-4">
                <Image src='/avatar.png' width='12' height='12' alt='' />
              </div>
              <div className='mr-3'>
                <div className=" text-lg mb-2">Total amount withdrawn</div>
                <div className=" text-xl font-bold">N{totalWithdrawals}</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='font-bold text-3xl mb-4'> Referral Link</div>
            <p className='text-xl'>The link below is your referral link. Share it with freinds and family to earn money on elev8</p>
            <div className='flex justify-between my-4'>
              <div className='border bg-white p-2 mr-3 '>{`www.elev8.ng/login/?ref=${user.userInfo.referralCode}`}</div>
              <button
                className='cursor-pointer w-auto text-xl text-white font-bold  bg-green-600 border-0 py-2'
                onClick={() => {
                  navigator.clipboard.writeText(user.userInfo.referralCode)
                  alert('your refferal link has succesfully been copied to your clipboard')
                }}
              > Copy </button>
            </div>
          </div>
        </div>
        <div className='font-bold text-3xl mb-10'>Withdrawal History</div>
        <div className=' flex flex-col items-start bg-white border rounded-3xl mb-8 p-6 '>
          {user.referral.data.withdrawals.map((withdrawal) => <>
            <div key='' className='flex justify-between items-start w-full p-4 text-lg'>
              <div className="rounded-full w-auto mr-6">
                {withdrawal.status === 'pending' && <div className="rounded-full bg-yellow-500 h-min py-1 px-2 mr-4">
                  <Image src='/avatar.png' width='24' height='24' alt='' />
                </div>}
                {withdrawal.status === 'rejected' && <div className="rounded-full bg-red-500 h-min py-1 px-2 mr-4">
                  <Image src='/avatar.png' width='24' height='24' alt='' />
                </div>}
                {withdrawal.status === 'confirmed' && <div className="rounded-full bg-green-500 h-min py-1 px-2 mr-4">
                  <Image src='/avatar.png' width='24' height='24' alt='' />
                </div>}
              </div>
              <div className='w-auto grow'>
                <div className="font-bold mb-3">Id: {withdrawal.withdrawalId}</div>
                <div className='mb-3'>
                    <div className="mb-1">Account Name: {withdrawal.accountName}</div>
                    <div className="mb-1">Account No.: {withdrawal.accountNo}</div>
                    <div className="mb-1">Bank: {withdrawal.bankName}</div>
                    <div className="mb-1">Amount: N{numberWithCommas(withdrawal.amount)}</div>
                </div>
                <div className='mr-3'>
                  <div className=" mb-3 ">Status: {withdrawal.status}</div>
                </div>
              </div>
            </div>
            <hr className="border-accent-2 mt-28 mb-6" />
          </>)}
        </div>
      </div>

    }
  </>
  )
}
