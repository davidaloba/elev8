import React, { useState } from 'react'
import Image from 'next/image'
import { getPeriod, expandPost, savePost, login } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import axios from 'axios'

import { Avatar } from '..'
import { getError } from '@db/error'
import Cookies from 'js-cookie'

export const Post = ({ post }) => {
  const dispatch = useAppDispatch()

  const { user, posts } = useAppSelector((state: RootState) => state)
  const {
    type,
    slug,
    title,
    body,
    image,
    data,
    updatedAt
  } = post
  const updated = getPeriod(updatedAt)

  const currentPost = posts.current
  const isTaskDone = user.userInfo.profile.tasks.includes(slug)
  const isPremiumPaid = user.userInfo.profile.paid.includes(slug)
  const [confirmPayment, setConfirmPayment] = useState(false)

  const expandHandler = async () => {
    dispatch(expandPost(post))
    window.scrollTo(0, 0)
  }

  const closeHandler = async () => {
    dispatch(expandPost({}))
  }

  const taskHandler = async () => {
    const points = data.points
    const task = slug
    try {
      console.log(points, task)
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

  const payHandler = async () => {
    const cost = data.cost
    const paid = slug
    try {
      console.log(cost, paid)
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
      {type === 'freebies' && (<div className='flex justify-between border rounded-3xl mb-8 p-4'>
        <div className=" w-auto mr-4">
          <Avatar type={type} width='70' height='70' />
        </div>

        <div>
          <div className=" mb-3">
            <div className=" flex items-start justify-between ">
              <div className=" text-xl font-bold w-9/12">{title}</div>
            </div>
            <div className="text-base mt-1">{updated} ago</div>
          </div>

          <div>
            {currentPost.slug
              ? <div className=''>
                <p className='text-lg'> {body} </p>
              </div>
              : <div>
                <p className='text-lg'>
                  {body.substring(0, 100)} {body.length >= 100 && '... '}
                  <span className='text-lime-800 underline cursor-pointer' onClick={expandHandler} >read more</span>
                </p>
              </div>
            }
          </div>

          <div className=" flex items-center justify-between  mt-5">
            <div className='flex items-center justify-between'>
              {/*  <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div> */}
              {currentPost.slug === undefined && (<div onClick={expandHandler} className='text-base hover:cursor-pointer mr-2'>
                [VIEW]
              </div>)}
              {/* {currentPost.slug && (<div onClick={shareHandler} className='text-base hover:cursor-pointer mr-2'>
                [SHARE]
              </div>)} */}
            </div>
            <div className='flex items-center justify-between'>
              {currentPost.slug && (
                <div onClick={closeHandler} className='text-base cursor-pointer sticky top-[470px] z-10'>[CLOSE]
                </div>)}
            </div>

          </div>
        </div>
      </div>)}

      {type === 'tasks' && (<div className='flex justify-between border rounded-3xl mb-8 p-4'>
        <div className=" w-auto mr-4">
          <Avatar type={type} width='70' height='70' />
        </div>

        <div>
          <div className=" mb-3">

            <div className=" flex items-start justify-between ">
              <div className=" text-xl font-bold w-9/12">{title}</div>
              { isTaskDone === false
                ? <div className='flex items-center justify-between bg-red-900 text-base text-slate-50 px-1'>
                <div className='mr-1 mt-1'>
                    <Image src='/icons/github-icon.svg' width='15' height='15' className="rounded-full" alt={type} />
                </div>
                [TO-DO]
              </div>
                : <div className='flex items-center justify-between bg-green-900 text-base text-slate-50 px-1'>
                  <div className='mr-1 mt-1'>
                    <Image src='/icons/github-icon.svg' width='15' height='15' className="rounded-full" alt={type} />
                  </div>
                  [DONE]
                </div>
              }
            </div>

            <div className="text-base mt-1">{updated} ago</div>
          </div>

          <div>
            {currentPost.slug
              ? <div className=''>
                <p className='text-lg'> {body} </p>
                { isTaskDone === false
                  ? <div className='mt-4 p-1 text-lg'>
                      Click the link below to complete the data.
                      <div>
                        <div className='mt-1'>
                          <a href={data.link} target='_blank' onClick={taskHandler} className=' text-base mt-1 p-1 border rounded hover:cursor-pointer' rel="noreferrer">
                            [THE LINK: {data.link} ]
                          </a>
                        </div>
                      </div>
                    </div>
                  : <div className='mt-4 p-1 text-lg border rounded'> You have completed this task </div>
                }
              </div>
              : <div>
                <p className='text-lg'>
                  {body.substring(0, 100)} {body.length >= 100 && '... '}
                  <span className='text-lime-800 underline cursor-pointer' onClick={expandHandler} >read more</span>
                </p>
              </div>
            }
          </div>

          <div className=" flex items-center justify-between  mt-5">
            <div className='flex items-center justify-between'>
              {/* <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div> */}
              {currentPost.slug === undefined && (<div onClick={expandHandler} className='text-base hover:cursor-pointer mr-2'>
                [VIEW]
              </div>)}
            </div>
            <div className='flex items-center justify-between'>
              {currentPost.slug && (
                <div onClick={closeHandler} className='text-base cursor-pointer'>[CLOSE]
                </div>)}
            </div>

          </div>
        </div>
      </div>)}

      {type === 'premium' && (<div className='flex justify-between border rounded-3xl mb-8 p-4'>
        <div className=" w-auto mr-4">
          <Avatar type={type} width='70' height='70' />
        </div>

        <div>
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
                </div> }
            </div>
            <div className="text-base mt-1">{updated} ago</div>
          </div>

          <div>
            {currentPost.slug
              ? <div className=''>
                <p className='text-lg'> {body} </p>
              </div>
              : <div>
                <p className='text-lg'>
                  {body.substring(0, 100)} {body.length >= 100 && '... '}
                  { isPremiumPaid && <span className='text-lime-800 underline cursor-pointer' onClick={expandHandler} >read more</span>}
                </p>
              </div>
            }
          </div>

          {confirmPayment === false
            ? (<div className=" flex items-center justify-between  mt-5">
              <div className='flex items-center justify-between'>
                {/* <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
                [SAVE]
              </div> */}
                {currentPost.slug === undefined && isPremiumPaid === false
                  ? <div onClick={() => setConfirmPayment(true)} className='text-base hover:cursor-pointer mr-2'>[PAY]</div>
                  : !currentPost.slug && <div onClick={expandHandler} className='text-base hover:cursor-pointer mr-2'>
                    [VIEW]
                  </div>}
              </div>
              <div className='flex items-center justify-between'>
                {currentPost.slug && (
                  <div onClick={closeHandler} className='text-base cursor-pointer'>[CLOSE]
                  </div>)}
              </div>
            </div>)
            : (<div className="text-base mt-5 p-2 border rounded-lg" >
              Would you like to pay "{data.cost} Pts" to view "{title}"
              <div className=" flex items-center  mt-2">
                <div onClick={() => setConfirmPayment(false)} className='text-base hover:cursor-pointer mr-2'>[NO]</div>
                <div onClick={payHandler} className='text-base hover:cursor-pointer mr-2'>[YES]</div>
              </div>
            </div>)
          }
        </div>
      </div>)}
    </>
  )
}
