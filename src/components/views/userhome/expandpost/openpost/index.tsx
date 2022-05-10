import Image from 'next/image'
import { getPeriod, expandPost, login } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import axios from 'axios'

import { getError } from '@db/error'
import Cookies from 'js-cookie'
import { useState } from 'react'

export const OpenPost = ({ post }) => {
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
  const [isLinkClicked, setIsLinkClicked] = useState(false)
  const isPremiumPaid = user.userInfo.profile.paid.includes(slug)

  const closeHandler = async () => {
    dispatch(expandPost({}))
  }

  const taskHandler = async () => {
    const points = data.points
    const task = slug
    try {
      const { data } = await axios.put(
        '/api/users/tasks',
        {
          email: user.userInfo.email,
          points: points,
          task: task
        },
        { headers: { authorization: `Bearer ${user.userInfo.token}` } }
      )
      dispatch(login(data))
      Cookies.set('userInfo', data)
      alert(`You've earned ${points} points`)
    } catch (err) {
      alert(getError(err))
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
    <>
      {type === 'freebies' && (<div className='flex justify-between  bg-white border rounded-3xl mb-8 p-4'>
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
          <div> <div className=''>
            <p className='text-lg'> {body} </p>
            {data.link && <div className='mt-1'>
              <a href={data.link} target='_blank' className=' text-base mt-1 p-1 border rounded hover:cursor-pointer' rel="noreferrer">
                [{data.link} ]
              </a>
            </div>}
          </div>
          </div>
          <div className=" flex items-center justify-between  mt-5">
            <div className='flex items-center justify-between'>
              {/*  <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div>
               {currentPost.slug && (<div onClick={shareHandler} className='text-base hover:cursor-pointer mr-2'>
                [SHARE]
              </div>)} */}
            </div>
            <div className='flex items-center justify-between'>
              <div onClick={closeHandler} className='text-base cursor-pointer sticky top-[470px] z-10'>[CLOSE]
              </div>
            </div>
          </div>
        </div>
      </div>)}

      {type === 'tasks' && (<div className='flex justify-between  bg-white border rounded-3xl mb-8 p-4'>
        <div className="rounded-full  bg-amber-500 h-min p-3  mr-4">
          <Image src='/checklist.png' width='36' height='36' alt={type} />
        </div>
        <div className='w-full'>
          <div className=" mb-3">
            <div className=" flex items-start justify-between ">
              <div className=" text-xl font-bold w-9/12">{title}</div>
              {isTaskDone === false
                ? <div className='flex items-center justify-between bg-red-900 text-base text-slate-50 px-1'>
                  <div className='mr-1 mt-1'>
                    <Image src='/checklist.png' width='15' height='15' className="rounded-full" alt={type} />
                  </div>
                  [TO-DO]
                </div>
                : <div className='flex items-center justify-between bg-green-900 text-base text-slate-50 px-1'>
                  <div className='mr-1 mt-1'>
                    <Image src='/checklist.png' width='15' height='15' className="rounded-full" alt={type} />
                  </div>
                  [DONE]
                </div>
              }
            </div>
            <div className="text-base mt-1">{updated} ago</div>
          </div>
          <div>
            <div className=''>
              <p className='text-lg'> {body} </p>
              {isTaskDone === false
                ? isLinkClicked === false
                  ? <div className='mt-4 p-1 text-lg'>
                  Click the link below to complete the task.
                    <div className='mt-1'>
                      <a href={data.link} target='_blank' onClick={() => setIsLinkClicked(true)} className=' text-base mt-1 p-1 border rounded hover:cursor-pointer' rel="noreferrer">
                        [{data.link} ]
                      </a>
                    </div>
                </div>
                  : <div className='mt-1'>
                    <div onClick={taskHandler} className=' text-base mt-1 p-1 border rounded hover:cursor-pointer'>
                      [CLICK TO CLAIM YOUR POINTS]
                    </div>
                  </div>
                : <div className='mt-4 p-1 text-lg border rounded'> You have completed this task </div>
              }
            </div>
          </div>
          <div className=" flex items-center justify-between  mt-5">
            <div className='flex items-center justify-between'>
              {/* <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div> */}
            </div>
            <div className='flex items-center justify-between'>
              <div onClick={closeHandler} className='text-base cursor-pointer'>[CLOSE]
              </div>
            </div>
          </div>
        </div>
      </div>)}

      {type === 'premium' && (<div className='flex justify-between  bg-white border rounded-3xl mb-8 p-4'>
        <div className=" rounded-full   bg-indigo-700 h-min p-3 mr-4">
          <Image src='/diamond.png' width='36' height='36' alt={type} />
        </div>
        <div className='w-full'>
          <div className=" mb-3">
            <div className=" flex items-start justify-between ">
              <div className=" text-xl font-bold w-9/12">{title}</div>
              {isPremiumPaid === false
                ? <div className='flex items-center justify-between bg-lime-600 text-base text-slate-50 px-1'>
                  <div className='mr-1 mt-1'>
                    <Image src='/icons/linkedin-icon.svg' width='15' height='15' className="rounded-full" alt={type} />
                  </div>
                  {data.cost} Pts
                </div>
                : <div className='flex items-center justify-between bg-lime-600 text-base text-slate-50 px-1'>
                  <div className='mr-1 mt-1'>
                    <Image src='/icons/linkedin-icon.svg' width='15' height='15' className="rounded-full" alt={type} />
                  </div>
                  [PAID]
                </div>}
            </div>
            <div className="text-base mt-1">{updated} ago</div>
          </div>
          <div>
            <div className=''>
              <p className='text-lg'> {body} </p>
              {data.link && <div className='mt-1'>
                <a href={data.link} target='_blank' className=' text-base mt-1 p-1 border rounded hover:cursor-pointer' rel="noreferrer">
                  [{data.link} ]
                </a>
              </div>}
            </div>
          </div>
          <div className=" flex items-center justify-between  mt-5">
            <div className='flex items-center justify-between'>
              {/* <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div> */}
            </div>
            <div className='flex items-center justify-between'>
              <div onClick={closeHandler} className='text-base cursor-pointer'>[CLOSE]
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </>
  )
}
