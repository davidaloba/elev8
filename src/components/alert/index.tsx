import React from 'react'
import { Container } from '@components'

export const Alert: React.FC = ({ preview, children }) => {
  return (
    <>
      <div
        className={preview ? 'bg-accent-7 border-accent-7 text-white' : 'bg-accent-1 border-accent-2' }
      >
        <Container>
          <div className="py-2 text-center text-xl text-red-600 font-semibold ">An Alert!!</div>
        </Container>
      </div>
    </>
  )
}
