import React from 'react'

import { Logo } from '../'

export const Header: React.FC = () => {
  return (
    <div className="text-center bg-gray-800 bg" data-testid="container">
      <Logo />
    </div>
  )
}
