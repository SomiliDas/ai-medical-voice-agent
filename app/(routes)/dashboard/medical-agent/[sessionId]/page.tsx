'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard'
import { Circle, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


type SessionDetail= {
  id : number,
  notes : string,
  sessionId : string,
  report : JSON,
  selectedDoctor : doctorAgent,
  createdOn : string
}

function MedicalVoiceAgent() {

  const {sessionId} = useParams()
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>()



  const getSessionDetails = async()=>{
    const result = await axios.get('/api/session-chat?sessionId=' +sessionId)
    setSessionDetail(result.data)
    
  }



  useEffect(()=>{
         
    sessionId && getSessionDetails();

  }, [sessionId])


  return (
    <div className='p-5 border rounded-3xl bg-secondary mx-12'>

        <div className='flex justify-between items-center  '>
          <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'> <Circle className='h-4 w-d'/> Not Connected </h2>
          <h2 className='font-bold text-center text-gray-400'> 00:00 </h2>
        </div>

        {sessionDetail&&<div className='flex flex-col items-center mt-10'>
          <Image src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.specialist} width={80} height={80} className='h-[100px] w-[100px] object-cover rounded-full' />
          <h2 className='mt-1 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
          <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

          <div className='mt-32'>
              <h2 className='text-gray-400'>Assistant Msg</h2>
              <h2 className='text-lg'>User Msg</h2>
          </div>

          <Button className='mt-20 cursor-pointer bg-gray-900'> <PhoneCall/> Start Call </Button>

        </div>}

    </div>
  )
}

export default MedicalVoiceAgent