import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPeriod, expandPost, login, setScrollPosition } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import axios from 'axios'

import { getError } from '@db/error'
import Cookies from 'js-cookie'

export const PostPreview = ({ post, scrollPosition }) => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state: RootState) => state)
  const {
    type,
    slug,
    title,
    body,
    data,
    updatedAt
  } = post
  const updated = getPeriod(updatedAt)

  const isTaskDone = user.userInfo.profile.tasks.includes(slug)
  const isPremiumPaid = user.userInfo.profile.paid.includes(slug)
  const [confirmPayment, setConfirmPayment] = useState(false)

  const expandHandler = async () => {
    dispatch(expandPost(post))
    dispatch(setScrollPosition(scrollPosition))
    window.scrollTo(0, 0)
  }

  const payHandler = async () => {
    const cost = data.cost
    const paid = slug
    try {
      const { data } = await axios.put(
        '/api/users/pay',
        {
          email: user.userInfo.email,
          cost: cost,
          paid: paid
        },
        { headers: { authorization: `Bearer ${user.userInfo.token}` } }
      )
      dispatch(login(data))
      Cookies.set('userInfo', data)
      alert(`You've been debited ${cost} points for ${title}`)
      setConfirmPayment(false)
    } catch (err) {
      alert(getError(err))
      setConfirmPayment(false)
    }
  }

  // const saveHandler = async () => {
  //   try {
  //     const { saves } = await axios.put(
  //       '/api/users/save',
  //       {
  //         user: user.userInfo.userName,
  //         slug: slug
  //       },
  //       { headers: { authorization: `Bearer ${user.userInfo.token}` } }
  //     )
  //     dispatch(savePost(saves))
  //   } catch (err) {
  //     alert(getError(err))
  //   }
  // }

  // const shareHandler = async () => {
  //   dispatch(expandPost(post))
  // }

  return (
    <div className=''>
      {type === 'freebies' && (<div className='flex justify-between bg-white border rounded-3xl mb-8 p-4'>
        <div className="rounded-full p-3 mr-4 bg-blue-700 h-min">
          <Image src='/free.png' width='36' height='36' alt={type} />
        </div>
        <div className='w-full'>
          <div className=" mb-3">
            <div className=" flex items-start justify-between ">
              <div className=" text-xl font-bold w-9/12">{title}</div>
            </div>
            <div className="text-base mt-1">{updated} ago</div>
          </div>
          <div>
            <div>
              <p className='text-lg'>
                {body.substring(0, 100)} {body.length >= 100 && '... '}
                <span className='text-lime-800 underline cursor-pointer' onClick={expandHandler} >read more</span>
              </p>
            </div>

          </div>
          <div className=" flex items-center justify-between  mt-5">
            <div className='flex items-center justify-between'>
              {/*  <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div> */}
              <button onClick={expandHandler} className=" cursor-pointer text-base text-white font-bold  bg-green-600 border-0 py-1 mr-2">
                View
              </button>
            </div>

          </div>
        </div>
      </div>)}

      {type === 'tasks' && (<div className='flex justify-between  bg-white border rounded-3xl mb-8 p-4'>
        <div className="rounded-full  bg-amber-500 h-min p-3 mr-4">
          <Image src='/checklist.png' width='36' height='36' alt={type} />
        </div>
        <div className='w-full'>
          <div className=" mb-3">
            <div className=" flex items-start justify-between ">
              <div className=" text-xl font-bold w-9/12">{title}</div>
              {isTaskDone === false
                ? <div className='flex items-center justify-between bg-red-900 text-base text-slate-50 px-1'>
                  <div className='mr-1 mt-1'>
                    <Image src='/checklist.png' width='15' height='15' alt={type} />
                  </div>
                  To-do
                </div>
                : <div className='flex items-center justify-between bg-green-900 text-base text-slate-50 px-1'>
                  <div className=' mr-1 mt-1'>
                    <Image src='/checklist.png' width='15' height='15' alt={type} />
                  </div>
                  Done
                </div>
              }
            </div>
            <div className="text-base mt-1">{updated} ago</div>
          </div>
          <div>
            <div>
              <p className='text-lg'>
                {body.substring(0, 100)} {body.length >= 100 && '... '}
                <span className='text-lime-800 underline cursor-pointer' onClick={expandHandler} >read more</span>
              </p>
            </div>
          </div>
          <div className=" flex items-center justify-between  mt-5">
            <div className='flex items-center justify-between'>
              {/* <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div> */}
              <button onClick={expandHandler} className=" cursor-pointer text-base text-white font-bold  bg-green-600 border-0 py-1 mr-2">
                View
              </button>
            </div>
          </div>
        </div>
      </div>)}

      {type === 'premium' && (<div className='flex justify-between  bg-white border rounded-3xl mb-8 p-4'>
        <div className="rounded-full  bg-indigo-700 h-min  p-3 mr-4">
          <Image src='/diamond.png' width='36' height='36' alt={type} />
        </div>
        <div className='w-full'>
          <div className=" mb-3">
            <div className=" flex items-start justify-between ">
              <div className=" text-xl font-bold w-9/12">{title}</div>
              {isPremiumPaid === false
                ? <div className='flex items-center justify-between bg-lime-600 text-base text-slate-50 px-1'>
                  <div className='mr-1 mt-1'>
                    <Image src='/diamond.png' width='15' height='15' className="rounded-full" alt={type} />
                  </div>
                  {data.cost} Pts
                </div>
                : <div className='flex items-center justify-between bg-lime-600 text-base text-slate-50 px-1'>
                  <div className='mr-1 mt-1'>
                    <Image src='/diamond.png' width='15' height='15' className="rounded-full" alt={type} />
                  </div>
                  Paid
                </div>}
            </div>
            <div className="text-base mt-1">{updated} ago</div>
          </div>
          <div>
            <div>
              <p className='text-lg'>
                {body.substring(0, 100)} {body.length >= 100 && '... '}
                {isPremiumPaid && <span className='text-lime-800 underline cursor-pointer' onClick={expandHandler} >read more</span>}
              </p>
            </div>
          </div>
          {confirmPayment === false
            ? (<div className=" flex items-center justify-between  mt-5">
              <div className='flex items-center justify-between'>
                {/* <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div> */}
                {isPremiumPaid === false
                  ? <button onClick={() => setConfirmPayment(true)} className=" cursor-pointer text-base text-white font-bold  bg-green-600 border-0 py-1 mr-2" >Pay</button>
                  : <button onClick={expandHandler} className=" cursor-pointer text-base text-white font-bold  bg-green-600 border-0 py-1 mr-2">
                    View
                  </button>}
              </div>
            </div>)
            : (<div className="text-base mt-5 p-2 border rounded-lg 'mt-4  hover:cursor-pointer text-center    text-green-700 font-bold bg-white border-green-600  py-2 w-11/12" >
              Would you like to pay "{data.cost} Pts" to View this post
              <div className=" flex justify-center mt-4">
                <button onClick={() => setConfirmPayment(false)} className='text-base cursor-pointer mr-10  text-green-700 font-bold bg-white border-green-600 hover:border-green-600 border py-1 px-4 '>No</button>
                <button onClick={payHandler} className='text-base hover:cursor-pointer ml-10 rounded cursor-pointer text-white font-bold  bg-green-600 border-0 py-1 px-4 '>Yes</button>
              </div>
            </div>)
          }
        </div>
      </div>)}
    </div>
  )
}
