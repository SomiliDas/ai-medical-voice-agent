'use client'

import Vapi from '@vapi-ai/web';
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard'
import { Circle, PhoneCall, PhoneOff } from 'lucide-react'
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

type messages = {
  role : string,
  text : string
}

function MedicalVoiceAgent() {

  const {sessionId} = useParams()
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>()
  const [callStarted , setCallStarted] = useState(false)
  const [vapiInstance, setVapiInstance] = useState<any>()
  const [currentRole, setCurrentRole] = useState<string | null>()
  const [liveTranscript, setLiveTranscript] = useState<string>()
  const [messages, setMessages] = useState<messages[]>([])
  



  const getSessionDetails = async()=>{
    const result = await axios.get('/api/session-chat?sessionId=' +sessionId)
    setSessionDetail(result.data)
    
  }



  useEffect(()=>{
         
    sessionId && getSessionDetails();

  }, [sessionId])



  const startCall = ()=>{

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi)
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);


    vapi.on('call-start', () => {
      setCallStarted(true)
      console.log('Call started')
    });

    vapi.on('call-end', () => {
        console.log('Call ended')
        setCallStarted(false)
    });


    vapi.on('message', (message) => {
        if (message.type === 'transcript') {
          const {role, transcriptType, transcript} = message
          console.log(`${message.role}: ${message.transcript}`);

          if(transcriptType == 'partial'){
              setLiveTranscript(transcript)
              setCurrentRole(role)
          }
          else if (transcriptType == 'final'){
                setMessages((prev : any )=>[...prev , {role : role, text: transcript} ])
                setLiveTranscript("")
                setCurrentRole(null)

          }
          
        }
    });

     vapiInstance.on('speech-start', () => {
      setCurrentRole('assistant');
      
    });
    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('user')
    });


  }


    const endCall = () => {
            if (!vapiInstance) {
              return
            }
             vapiInstance.stop();
             vapiInstance.off('call-start')
             vapiInstance.off('call-end')
             vapiInstance.off('message')

             setCallStarted(false)
             setVapiInstance(null)

          };


  return (
    <div className='p-5 border rounded-3xl bg-secondary mx-12'>

        <div className='flex justify-between items-center  '>
          <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'> <Circle className ={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`}/> { !callStarted ? 'Not Connected' : 'Connected'} </h2>
          <h2 className='font-bold text-center text-gray-400'> 00:00 </h2>
        </div>

        {sessionDetail&&<div className='flex flex-col items-center mt-10'>
          <Image src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.specialist} width={80} height={80} className='h-[100px] w-[100px] object-cover rounded-full' />
          <h2 className='mt-1 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
          <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

          <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
              {messages?.slice(-4).map((msg : messages, index)=>(
                    
                  <h2 key={index} className='text-gray-400 p-2 '> {msg.role} : {msg.text}</h2>
                    
              ))}
              
              {
              liveTranscript&&liveTranscript.length > 0 &&
                <h2 className='text-lg'>{currentRole} : {liveTranscript}</h2>              
              }
          </div>

          {!callStarted ? 
            <Button className='mt-20 cursor-pointer bg-gray-900' onClick={startCall}> <PhoneCall/> Start Call </Button>
             :
             <Button variant={'destructive'} className='mt-20 cursor-pointer bg-gray-900' onClick={endCall}> <PhoneOff/> Disconnect </Button>
          }

        </div>}

    </div>
  )
}

export default MedicalVoiceAgent

