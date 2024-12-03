import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex  flex-col items-center mx-56 gap-9'>
      <h1
      className='font-extrabold text-[60px] text-center mt-16'
      ><span className='text-[#9FDB51]'>Жаңа саяхатыңды AI-мен аш:</span> Барлық жоспар бір жерде!</h1>
      <p className='text-xl text-gray-500 text-center' >Сіздің жеке саяхат жоспарлаушыңыз және саяхат кураторыңыз, сіздің қызығушылықтарыңыз бен бюджетіңізге сәйкес арнайы маршруттар жасайды.</p>
      <Link to={'/create-trip'}>
        <Button>Жоспарлау</Button>
      </Link>
    </div>
  )
}

export default Hero