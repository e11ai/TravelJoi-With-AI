import React from 'react'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="src/assets/logo.svg"/>
      <div>
        <Button>Кіру</Button>
      </div>
    </div>
  )
}

export default Header