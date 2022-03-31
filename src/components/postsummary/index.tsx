import React from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import { Avatar, Button, CancelIcon } from '..'

export const PostSummary: React.FC = ({ post }) => {
  const {
    title,
    featuredImage,
    date,
    excerpt,
    author,
    slug,
    category,
    likes
  } = post

  const dispatch = useDispatch()
  const likeHandler = async (post) => {
    dispatch({ type: 'LIKE', payload: { ...post } })
  }

  return (
    <div>
      <div className="mb-5">
        {featuredImage && (
          <Image src={featuredImage} alt={title} title={title} layout="responsive" sizes="100%" width='100%' height='60%'/>
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></a>
        </Link>
      </h3>
      <Avatar avatar={author.avatar} />
      <div className="text-lg mb-4">
        {date}
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <Button onClick={likeHandler} > Like {likes} </Button>
    </div>
  )
}
