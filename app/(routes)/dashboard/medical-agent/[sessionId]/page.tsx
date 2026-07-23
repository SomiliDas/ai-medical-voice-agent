'use client'

import Vapi from '@vapi-ai/web';
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard'
import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';



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
  const [loading, setLoading ] = useState(false)
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>()
  const [callStarted , setCallStarted] = useState(false)
  const [vapiInstance, setVapiInstance] = useState<any>()
  const [currentRole, setCurrentRole] = useState<string | null>()
  const [liveTranscript, setLiveTranscript] = useState<string>()
  const [messages, setMessages] = useState<messages[]>([])
  const router = useRouter()
  



  const getSessionDetails = async()=>{
    const result = await axios.get('/api/session-chat?sessionId=' +sessionId)
    setSessionDetail(result.data)
    
  }



  useEffect(()=>{
         
    sessionId && getSessionDetails();

  }, [sessionId])



  const generateReport = async () =>{
            const result = await axios.post('/api/medical-report', {
              messages : messages,
              sessionDetail : sessionDetail,
              sessionId : sessionId
            })

            console.log(result.data)
            return result.data
          }




  const startCall = ()=>{

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi)

    const vapiAgentConfig ={

      name : 'AI Medical Doctor Voice Agent',
      firstMessage : "Hi!, I'm your AI Medical Assistant. I'm here to help with you with any health issues.",
      transcriber : {
        provider : 'assembly-ai',
        language : 'en'
      },
      voice : {
        provider : 'vapi',
        voiceId : sessionDetail?.selectedDoctor?.voiceId
      },
      model : {
        provider : 'openai',
        model : 'gpt-4.1',
        messages : [
          {
             role : 'system',
             content : sessionDetail?.selectedDoctor?.agentPrompt
          }
        ]
      }

    }

    //@ts-ignore
    vapi.start(vapiAgentConfig);


    vapi.on('call-start', () => {
      setCallStarted(true)
      console.log('Call started')
    });

    vapi.on('call-end', async() => {
        console.log('Call ended')
        setCallStarted(false)
        await generateReport()

        setVapiInstance(null)
        setLoading(false)


        toast.success("Report Generated!")

        router.replace('/dashboard')
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

     vapi.on('speech-start', () => {
      setCurrentRole('assistant');
      
    });
    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('user')
    });


  }


    const endCall = async () => {
            setLoading(true)
            if (!vapiInstance) {
              return
            }
             vapiInstance.stop();

             setCallStarted(false)
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
            <Button className='mt-20 cursor-pointer bg-gray-900' onClick={startCall} disabled={loading}> {!loading ? <PhoneCall/> : <Loader className='animate-spin'/>} Start Call </Button>
             :
             <Button variant={'destructive'} className='mt-20 cursor-pointer bg-gray-900' onClick={endCall} disabled={loading}> {!loading ? <PhoneOff/> : <Loader className='animate-spin'/>} Disconnect </Button>
          }

        </div>}

    </div>
  )
}

export default MedicalVoiceAgent

