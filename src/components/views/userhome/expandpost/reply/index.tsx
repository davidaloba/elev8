import React from 'react'
import { getPeriod } from '@store/actions'
import axios from 'axios'

import { Avatar, Button } from '@components'

export const Reply = ({ reply }) => {
  console.log(reply)

  const { comment, userName, updatedAt, avatar } = reply
  const updated = getPeriod(updatedAt)

  return (
    <div className='flex justify-between mb-2 p-8'>

      <div className="relative mr-4">
        <Avatar src='/avatar.png' type={userName} width='60' height='60' />
      </div>

      <div>
        <div className=" mb-1">
          <div className=" flex items-start justify-start ">
            <div className=" text-xl font-bold mr-1">{userName}</div>
            <div className=" mr-1 text-gray-600">•</div>
            <div className="text-base mt-1">{updated} ago</div>
          </div>
        </div>
        <div>
          <p className='text-lg'>
            {comment}
          </p>
        </div>
      </div>

    </div>
  )
}
