'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'

function HistoryList() {

    const [historyList, setHistoryLink] = useState([])
  return (
    <div className='mt-10'>
        {historyList.length==0 ? 
            <div className='flex flex-col items-center justify-center p-7 border border-dashed border-2 rounded-2xl'>
                <Image src={'/medical-assistance.png'} alt='empty' width={150} height={200}/>
                <h2 className='font-bold text-xl mt-2'>No Recent Consultations</h2>
                <p>It looks like you have not cosulted with any doctors yet.</p>
                <Button className="mt-5 cursor-pointer bg-gray-900"> + Start a Consultation</Button>
            </div>
            :
            <div>

            </div>
        }
    </div>
  )
}

export default HistoryList
