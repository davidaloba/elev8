import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar } from '..'

export const FeaturedPost: React.FC = ({ featuredPost }) => {
  const {
    title,
    featuredImage,
    date,
    excerpt,
    slug,
    categories,
    saves,
    authorProfile
  } = featuredPost
  const author = authorProfile[0].authorProfile
  return (
    <section>
      <div className="mb-8 md:mb-16 cursor-pointer">
        <Link href={`/posts/${slug}`}>
          {featuredImage && (
            <Image src={featuredImage} alt="" title={title} layout="responsive" sizes="100%" width='100%' height='50%' />
          )}
        </Link>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`}>
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Link>
          </h3>
          <Avatar author={author} />
          <div className="mb-4 md:mb-0 text-lg">
            <p>{date}</p>
          </div>
        </div>
        <div>
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
      </div>
    </section>
  )
}
