import React from 'react'

function PlaceCardItem({place}) {
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5'>
        <img src="/placeholder.jpg" 
        className='w-[130px] h-[130px] rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg '>{place.place_name}</h2>
            <p className='text-sm text-gray-400'>{place.place_details}</p>
            <h2 className='mt-2'>🕝 {place.time_travel}</h2>
        </div>
    </div>
  )
}

export default PlaceCardItem