'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


export type doctorAgent = {
    id : number,
    specialist : string,
    description : string,
    image : string,
    agentPrompt : string,
    voiceId : string,
    subscriptionRequired : boolean
}

type props = {
    doctorAgent : doctorAgent
}


function DoctorAgentCard({doctorAgent} : props) {


  const {has}= useAuth()
  const paidUser = has({ plan: 'pro' })

  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const onStartConsultation = async()=>{
        setLoading(true)
        const result = await axios.post('/api/session-chat',{
            notes : 'New Query',
            selectedDoctor : doctorAgent
        })
        console.log(result.data)
        if(result.data?.sessionId){
            const sessionId = result.data.sessionId
             
            router.push('/dashboard/medical-agent/'+sessionId)

        }
        setLoading(false)
    }


  return (
    <div className='relative'>
      { doctorAgent?.subscriptionRequired ?
        <Badge className='absolute right-0 m-2  '>
          Premium
        </Badge>
        :
        null
      }
      <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={300} className='w-full h-[250] object-cover rounded-2xl '/>
      <h2 className='font-bold mt-1'>{doctorAgent.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>
      <Button className="cursor-pointer bg-gray-900 w-full mt-2" disabled={!paidUser&&doctorAgent.subscriptionRequired} onClick={onStartConsultation}> Start Consultation { loading ? <Loader className='animate-spin'/> : <IconArrowRight/>} </Button>
    </div>
  )
}

export default DoctorAgentCard
