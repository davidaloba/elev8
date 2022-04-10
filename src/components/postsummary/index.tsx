import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { login } from '@store/actions'
import { AppState } from '@store'
import axios from 'axios'

import { Avatar, Button, CancelIcon } from '..'

export const PostSummary = ({ post }) => {
  const {
    title,
    featuredImage,
    date,
    excerpt,
    slug,
    categories,
    saves,
    authorProfile,
    createdAt
  } = post
  const author = authorProfile[0].authorProfile

  const dispatch = useDispatch()
  const userInfo = useSelector((state: AppState) => state.user.data)
  const saveHandler = async (userInfo, slug) => {
    try {
      const { saves } = await axios.put(
        '/api/users/save',
        {
          user: userInfo.userName,
          slug
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      )
      dispatch(login(saves))
    } catch (err) {
    }
  }

  return (
    <div>
      <div className="mb-5 cursor-pointer">
        <Link href={`/posts/${slug}`}>
        {featuredImage && (
          <Image src={featuredImage} alt={title} title={title} layout="responsive" sizes="100%" width='100%' height='60%'/>
        )}
        </Link>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></a>
        </Link>
      </h3>
        <div className="text-base">Posted  {createdAt} Under {categories} </div>
      <div className="text-lg mb-4">
        {date}
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <Avatar author={author} />
      <Button onClick={saveHandler} className='mt-5'> Save {saves} </Button>
    </div>
  )
}
