import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { getPeriod, expandPost, savePost } from '@store/actions'
import { RootState, useAppDispatch, useAppSelector } from '@store'
import axios from 'axios'

import { Avatar } from '..'
import { getError } from '@db/error'

export const Post = ({ post }) => {
  const dispatch = useAppDispatch()
  const { user, posts } = useAppSelector((state: RootState) => state)

  const currentPost = posts.current

  const {
    type,
    slug,
    title,
    body,
    image,
    points,
    replies,
    updatedAt
  } = post
  const updated = getPeriod(updatedAt)

  const expandHandler = async () => {
    dispatch(expandPost(post))
    window.scrollTo(0, 0)
  }

  const saveHandler = async () => {
    try {
      const { saves } = await axios.put(
        '/api/users/save',
        {
          user: user.userInfo.userName,
          slug: slug
        },
        { headers: { authorization: `Bearer ${user.userInfo.token}` } }
      )
      dispatch(savePost(saves))
    } catch (err) {
      alert(getError(err))
    }
  }

  const shareHandler = async () => {
    dispatch(expandPost(post))
  }

  const closeHandler = async () => {
    dispatch(expandPost({}))
  }

  const payHandler = async () => {
    dispatch(expandPost(post))
  }

  return (
    <div className='flex justify-between  border rounded-3xl mb-8 p-4 '>

      <div className=" w-auto mr-4">
        <Avatar type={type} width='70' height='70' />
      </div>

      <div>
        <div className=" mb-3">
          <div className=" flex items-start justify-between ">
            <div className=" text-xl font-bold w-9/12">{title}</div>
            {type === 'premium' && (<div className='flex items-center justify-between bg-lime-600 text-base text-slate-50 px-1'>
              <div className='mr-1 mt-1'>
                <Image src='/icons/linkedin-icon.svg' width='15' height='15' className="rounded-full" alt={type} />
              </div>
              {points} Pts
            </div>)}
          </div>
          <div className="text-base mt-1">{updated} ago</div>
        </div>

        <div>
          {currentPost.slug
            ? <p className='text-lg'> {body} </p>
            : <p className='text-lg'>
              {body.substring(0, 100)} {body.length >= 100 && '... '}
              <span className='text-lime-800 underline cursor-pointer' onClick={expandHandler} >view</span>
            </p>
          }

        </div>
        <div className=" flex items-center justify-between  mt-5">
          <div className='flex items-center justify-between'>
            <div onClick={saveHandler} className=' text-base hover:cursor-pointer mr-2'>
              [SAVE]
              {/* <Image src='/avatar.png' width='18' height='18' className="rounded-full" alt={type} /> */}
            </div>
            {currentPost.slug === undefined && (<div onClick={expandHandler} className='text-base hover:cursor-pointer mr-2'>
              [REPLY]
            </div>)}
            {type !== 'premium' && (<div onClick={shareHandler} className='text-base hover:cursor-pointer mr-2'>
              [SHARE]
            </div>)}
            {currentPost.slug && (
              <div onClick={closeHandler} className='text-base cursor-pointer'>[CLOSE]
              </div>)}
          </div>
          {type === 'premium' && (<button onClick={payHandler} className='py-1 px-2 text-lg bg-lime-600 text-slate-50 border-0'>Pay</button>)}
        </div>
      </div>

    </div>
  )
}
